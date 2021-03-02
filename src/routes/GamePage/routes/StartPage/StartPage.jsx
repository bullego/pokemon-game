import {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import Layout from '../../../../components/Layout';
import PokemonCard from '../../../../components/PokemonCard';
import stl from './StartPage.module.css';
import layoutBg from '../../../../assets/bg3.jpg';
import database from '../../../../service/firebase';
import { useDispatch, useSelector } from 'react-redux';
import {setPokemonsAC,
			 	setSelectedPokAC,
				removeUnselectedPokAC,
				clearSelectedPoksAC,
				clearOpponentPoksAC,
				setIsWinnerPlayerAC} from '../../../../redux/pokemon-reducer';


const StartPage = () => {
	const history = useHistory();

	const {pokemonData, selectedPoks, opponentPokemonData} = useSelector(state => state.pokemons);
	const dispatch = useDispatch();

	useEffect(() => {
		//reset Context at first render
		selectedPoks && (selectedPoks.length > 0) && dispatch(clearSelectedPoksAC());
		opponentPokemonData && (opponentPokemonData.length > 0) && dispatch(clearOpponentPoksAC());
		dispatch(setIsWinnerPlayerAC(false));
		
		//get poks from database and set to the STATE
		database.ref('pokemons').once('value', (snapshot) => {
			dispatch(setPokemonsAC(snapshot.val()));
		});		
	}, []);

	
	const onCardClick = (id) => {
		//add new property 'isSelectedCard' to the selected pokemon(object)
		let objKey = null;

		const updatedPokemons = Object.entries(pokemonData).reduce((acc, item) => {
			const pokemon = {...item[1]};
			
			if (pokemon.id === id) {
				objKey =	item[0];
				pokemon.isSelectedCard = !pokemon.isSelectedCard;
			};
			
			acc[item[0]] = pokemon;

			return acc;
		}, {});

		//refresh STATE with new selected pokemon
		dispatch(setPokemonsAC(updatedPokemons));

		if (objKey) {
			//add or remove to the STATE(array) all selected pokemons
			const updatedPokemon = updatedPokemons[objKey];

			if(selectedPoks.find(pok => pok.id === updatedPokemon.id)) {			
				const index = selectedPoks.findIndex(pok => pok.id === updatedPokemon.id);
				
				const poksAfterUnselected = [
					...selectedPoks.slice(0, index),
					...selectedPoks.slice(index+1)
				]
				dispatch(removeUnselectedPokAC(poksAfterUnselected))
			}
			else {
				dispatch(setSelectedPokAC(updatedPokemon))
			}
		}
	}

	const startGameBtn = () => {
		history.push('/game/board');
	}
	
	return (
			<Layout id='cards'
							title='Cards'
							colorTitle='#252934'
							urlBg={layoutBg}>

				<div className={stl.btn_wrap}>
					<button className={stl.start_btn}
									onClick={startGameBtn}
									disabled={selectedPoks.length < 5}>
						Start Game
					</button>
				</div>

				<div className={stl.flex}>
					{ Object.entries(pokemonData).map(([key, value]) => 
						<PokemonCard key={key}
												 className={stl.cardSize}
												 name={value.name} 
												 img={value.img}
												 id={value.id}
												 type={value.type}
												 values={value.values}
												 isActiveCard={true}
												 isSelectedCard={value.isSelectedCard}
												 onCardClick={() => {
													if(selectedPoks.length < 5 || value.isSelectedCard) {
														onCardClick(value.id)
													}
												 }} />)
					}
				</div>
			</Layout>
	)
}

export default StartPage;