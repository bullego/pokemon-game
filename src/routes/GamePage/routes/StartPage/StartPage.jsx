import {useState, useEffect, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import Layout from '../../../../components/Layout';
import PokemonCard from '../../../../components/PokemonCard';
import stl from './StartPage.module.css';
import layoutBg from '../../../../assets/bg3.jpg';
import database from '../../../../service/firebase';
import { PokemonContext } from '../../../../context/pokemonContext';


const StartPage = () => {
	const history = useHistory();
	const pokContext = useContext(PokemonContext);
	const [pokemons, setPokemons] = useState({});
	// console.log('pokContext StartPage: ', pokContext);

	useEffect(() => {
		//reset Context at first render
		(pokContext.selectedPoks.length > 0) && pokContext.clearSelectedPoksFromContext();
		(pokContext.opponentPoks.length > 0) && pokContext.clearOpponentPoksFromContext();
		pokContext.setIsWinner(false);
		
		//get poks from database and set to the STATE
		database.ref('pokemons').once('value', (snapshot) => {
			setPokemons(snapshot.val());
		});		
	}, []);

	
	const onCardClick = (id) => {
		//add new property 'isSelectedCard' to the selected pokemon(object)
		let objKey = null;

		const updatedPokemons = Object.entries(pokemons).reduce((acc, item) => {
			const pokemon = {...item[1]};
			
			if (pokemon.id === id) {
				objKey =	item[0];
				pokemon.isSelectedCard = !pokemon.isSelectedCard;
			};
			
			acc[item[0]] = pokemon;

			return acc;
		}, {});

		//refresh pokemons(object) with new selected pokemon
		setPokemons(updatedPokemons);

		if (objKey) {
			//add to the Context(array) all selected pokemons
			const updatedPokemon = updatedPokemons[objKey];
			pokContext.addSelectedPokemon(updatedPokemon)
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
									disabled={pokContext.selectedPoks.length < 5}>
						Start Game
					</button>
				</div>

				<div className={stl.flex}>
					{ Object.entries(pokemons).map(([key, value]) => 
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
													if(pokContext.selectedPoks.length < 5 || value.isSelectedCard) {
														onCardClick(value.id)
													}
												 }} />)
					}
				</div>
			</Layout>
	)
}

export default StartPage;

/*
1) Загрузка страницы -> очистка контекста PokContext для возможности выбрать новых покемонов + сбор с сервера покемонов и запись их в обьект pokemons в STATE (useEffect -> database -> setPokemons( snapshot.val()) ) для дальнейшей отрисовки на экране через компонент <PokemonCard/>. pokemons - это обьект с набором пар ("ключ"(странная строка): "значение"(обьект покемона))

2) Выбор игровой пятерки. Нужно отметить 5 покемонов, которыми будем сражаться. Клик на покемона - добавление его в игровую пятерку, повторный клик - удалеине из пятерки. При клике мы выбираем покемона и добавляем ему новое св-во isSelectedCard и присваиваем ему true. Т.о. имеем "старый-новый" набор покемонов (updatedPokemons), одному из которых добавлена информация о том, что он был отмечен юзером.
Также, покемона, которого выбрал юзер, мы помещаем и в Контекст PokContext (массив выбранных покемонов selectedPoks) через метод addSelectedPokemon(updatedPokemon) для дальнейшего использования выбранных покемонов в других Компонентах.

Перед игрой можно выбрать максимум 5 покемонов. За эти следит проверка pokContext.selectedPoks.length < 5 || value.isSelectedCard

3) Нажатие на кнопку "Start Game" через обьект "history" хука useHistory() перекинет нас c 5-кой покемонов на игровое поле 'Board Page'. Кнопка "Start Game" активируется только после выбора 5 покемонов.
*/