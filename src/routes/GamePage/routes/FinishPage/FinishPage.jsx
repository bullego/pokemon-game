import {useContext, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PokemonContext } from '../../../../context/pokemonContext';
import PokemonCard from '../../../../components/PokemonCard';
import database from '../../../../service/firebase';
import stl from './FinishPage.module.css';

const FinishPage = () => {
	const history = useHistory();
	const {selectedPoks, opponentPokemonData, isWinner} = useSelector(state => state.pokemons);
	const[selectedOpponentPok, setSelectedOpponentPok] = useState(null);

	useEffect(() => {
		//refresh selected pokemon (remove them from STATE)
		setSelectedOpponentPok(null);
	}, [])


	if((selectedPoks.length === 0) || (opponentPokemonData && opponentPokemonData.length === 0)) {
		//protected route
		history.push('/game');
	}

	const onEndGameHandler = () => {
		//add to gatabase new pokemon 
		if(isWinner) {
			const newKey = database.ref().child('pokemons').push().key;
			database.ref('pokemons/' + newKey).set(selectedOpponentPok)
		}
		history.push('/game');
	}

	const onOpponentPokClick = (opponentPok) => {
		setSelectedOpponentPok(opponentPok)
	}

	return (
		<div className={stl.finish_page}>
			<div className={stl.player1_pokemons}>
				{ selectedPoks.map(card => {
						return (
							<div key={card.id}
									 className={stl.player1_pokemon}>
								<PokemonCard name={card.name} 
														 img={card.img}
														 id={card.id}
														 type={card.type}
														 values={card.values}
														 isActiveCard={true}
														 minimize={true}/>
							</div>
						)
					})
				}
			</div>

			<div className={stl.btn_endgame_wrap}>
				<button className={stl.btn_endgame}
								onClick={onEndGameHandler}>
					END GAME
				</button>
			</div>

			<div className={stl.player2_pokemons}>
				{ opponentPokemonData.map(card => {
						return (
							<div key={card.id}
									 className={stl.player2_pokemon}
									 onClick={() => onOpponentPokClick(card)}>
								<PokemonCard name={card.name} 
														 img={card.img}
														 id={card.id}
														 type={card.type}
														 values={card.values}
														 isActiveCard={true}
														 minimize={true}/>
							</div>
						)
					})
				}
			</div>
		</div>
	);
};

export default FinishPage;