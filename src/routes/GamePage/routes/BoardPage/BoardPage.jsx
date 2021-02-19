import {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import PokemonCard from '../../../../components/PokemonCard';
import PlayerBoard from './component/PlayerBoard';
import Result from './component/Result';
import ArrowChoice from './component/ArrowChoice';
import stl from './BoardPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {setIsWinnerPlayerAC,
				clearOpponentPoksAC,
				getOpponentPoksTC,
				getBoardTC,
				combineCardWithBoardTC} from '../../../../redux/pokemon-reducer';


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
	const dispatch = useDispatch();
	const {selectedPoks,
				 opponentPokemonData,
				 boardData,
				 combineBoardData} = useSelector(state => state.pokemons);
	
	const [randomPlayerNumber, setRandomPlayerNumber] = useState(null);
	const [board, setBoard] = useState([]);
	const [player1, setPlayer1] = useState(() => {
		return selectedPoks.map(pok => ({
			...pok,
			possession: 'blue',
			isSelectedCard: false //for fixed styles
		}))
	});
	const [player2, setPlayer2] = useState([]);
	const [chosenCard, setChosenCard] = useState(null);
	const [playerSteps, setPlayerSteps] = useState(0);
	const [winType, setWinType] = useState(null);
	const [showArrow, setShowArrow] = useState(true);

	if(selectedPoks.length === 0) {
		history.replace('/game');
	}

	useEffect(() => {
		combineBoardData && setBoard(combineBoardData);
	}, [combineBoardData])


	useEffect(() => {
		//refresh opponent pokemons (remove them from Context)
		opponentPokemonData && (opponentPokemonData.length > 0) && dispatch(clearOpponentPoksAC());

		//set first random player step
		let random = (Math.random()<.5)+1
		setTimeout(() => setRandomPlayerNumber(random), 3000);

		dispatch(getBoardTC());
		setBoard(boardData);

		dispatch(getOpponentPoksTC());
		setPlayer2(() => {
			return opponentPokemonData.map(pok => ({
				...pok,
				possession: 'red',
			}))
		});
	}, [])

	
	useEffect(() => {
		if(playerSteps === 9) {
			const [player1Count, player2Count] = counterWinCards(board, player1, player2);

			if(player1Count > player2Count) {
				setWinType('win');
				dispatch(setIsWinnerPlayerAC(true));
				setTimeout(() => history.push('/game/finish'), 2000)
			} 
			else if(player1Count < player2Count) {
				setWinType('lose');
				setTimeout(() => history.push('/game/finish'), 2000)
			} 
			else {
				setWinType('draw');
				setTimeout(() => history.push('/game/finish'), 2000)
			}
		}
	}, [playerSteps])


	const handleClickSquare = async (squarePosition) => {
		//match selected card with empty square using backend
		if(chosenCard) {
			const params = {
				position: squarePosition,
				card: chosenCard,
				board
			}
			
			// dispatch(combineCardWithBoardTC(params));
		  await dispatch(combineCardWithBoardTC(params));

			//refresh STATE (remove card from player1 or player2) after match card with board
			if(chosenCard.playerNumber === 1) {
				setPlayer1(prevState => prevState.filter(card => card.id !== chosenCard.id));
			}
			if(chosenCard.playerNumber === 2) {
				setPlayer2(prevState => prevState.filter(card => card.id !== chosenCard.id));
			}

			//count player steps to win/lose/draw
			setPlayerSteps(prevState => {
				const count = prevState + 1
				return count
			})

			setShowArrow(false);
		}
	}
	

	return (
		<div className={stl.root}>
			{showArrow ? <ArrowChoice side={randomPlayerNumber}/> : null}

			<div className={stl.playerOne}>
				<PlayerBoard cards={player1}
										 playerNumber={1}
										 playerSteps={playerSteps}
										 randomPlayerNumber={randomPlayerNumber}
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
										 playerSteps={playerSteps}
										 randomPlayerNumber={randomPlayerNumber}
										 onChosenCard={(card) => setChosenCard(card)}/>
			</div>
			
			{playerSteps === 9 ? <Result type={winType}/> : null}
		</div>
	);
};

export default BoardPage;