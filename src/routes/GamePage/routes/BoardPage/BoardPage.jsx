import {useContext, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {PokemonContext} from '../../../../context/pokemonContext';
import PokemonCard from '../../../../components/PokemonCard';
import PlayerBoard from './component/PlayerBoard';
import stl from './BoardPage.module.css';


const baseUrl = 'https://reactmarathon-api.netlify.app/api';

const counterWinCards = (boardWithCards, player1, player2) => {
	let player1Count = player1.length;
	let player2Count = player2.length;

	boardWithCards.forEach(square => {
		if((!!square.card) && square.card.possession === 'blue') {
			player1Count++;
		}
		if((!!square.card) && square.card.possession === 'red') {
			player2Count++;
		}
	})
	return [player1Count, player2Count]
}


const BoardPage = () => {
	const history = useHistory();
	const pokContext = useContext(PokemonContext);

	const [board, setBoard] = useState([]);
	const [player1, setPlayer1] = useState(() => {
		return pokContext.selectedPoks.map(pok => ({
			...pok,
			possession: 'blue',
			isSelectedCard: false //for fixed styles
		}))
	});
	const [player2, setPlayer2] = useState([]);
	const [chosenCard, setChosenCard] = useState(null);
	const [playerSteps, setPlayerSteps] = useState(0);

	if(pokContext.selectedPoks.length === 0) {
		history.replace('/game');
	}

	useEffect(async () => {
		(pokContext.opponentPoks.length > 0) && pokContext.clearOpponentPoksFromContext();

		const boardResponse = await fetch(`${baseUrl}/board`);
		const boardRequest = await boardResponse.json();

		setBoard(boardRequest.data);

		const player2Response = await fetch(`${baseUrl}/create-player`);
		const player2Request = await player2Response.json();
		
		if(pokContext.opponentPoks.length < 6) {
			pokContext.addOpponentPokemon(player2Request.data);
		}
		
		setPlayer2(() => {
			return player2Request.data.map(pok => ({
				...pok,
				possession: 'red'
			}))
		});
	}, [])

	
	useEffect(() => {
		if(playerSteps === 9) {
			const [player1Count, player2Count] = counterWinCards(board, player1, player2);

			if(player1Count > player2Count) {
				alert('WIN');
				pokContext.setIsWinner(true);
				history.push('/game/finish');
			} 
			else if(player1Count < player2Count) {
				alert('LOSE');
				history.push('/game/finish');
			} 
			else {
				alert('DRAW');
				history.push('/game/finish');
			}
		}
	}, [playerSteps])


	const handleClickSquare = async (squarePosition) => {
		if(chosenCard) {
			const params = {
				position: squarePosition,
				card: chosenCard,
				board
			}

			const res = await fetch(`${baseUrl}/players-turn`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(params)
			});

			const matchCardToBoard = await res.json();
			
			if(chosenCard.playerNumber === 1) {
				setPlayer1(prevState => prevState.filter(card => card.id !== chosenCard.id));
			}
			if(chosenCard.playerNumber === 2) {
				setPlayer2(prevState => prevState.filter(card => card.id !== chosenCard.id));
			}

			setBoard(matchCardToBoard.data);
			setPlayerSteps(prevState => {
				const count = prevState + 1
				return count
			})
		}
	}


	return (
		<div className={stl.root}>
			<div className={stl.playerOne}>
				<PlayerBoard cards={player1}
										 playerNumber={1}
										 onChosenCard={(card) => setChosenCard(card)}/>
			</div>

			<div className={stl.board}>
				{ board.map(square => (
					<div key={square.position}
							 className={stl.boardPlate}
							 onClick={() => !square.card && handleClickSquare(square.position)}
					>
						{square.card && <PokemonCard {...square.card} minimize isActiveCard/>}
					</div>
					))
				}
			</div>

			<div className={stl.playerTwo}>
				<PlayerBoard cards={player2}
										 playerNumber={2}
										 onChosenCard={(card) => setChosenCard(card)}/>
			</div>
		</div>
	);
};

export default BoardPage;