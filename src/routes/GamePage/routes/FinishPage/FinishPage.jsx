import {useContext, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import { PokemonContext } from '../../../../context/pokemonContext';
import PokemonCard from '../../../../components/PokemonCard';
import database from '../../../../service/firebase';
import stl from './FinishPage.module.css';

const FinishPage = () => {
	const history = useHistory();
	const pokContext = useContext(PokemonContext);
	const[selectedOpponentPok, setSelectedOpponentPok] = useState(null);

	useEffect(() => {
		//refresh selected pokemon (remove them from STATE)
		setSelectedOpponentPok(null);
	}, [])

	if((pokContext.selectedPoks.length === 0) || (pokContext.opponentPoks.length === 0)) {
		//protected route
		history.push('/game');
	}

	const onEndGameHandler = () => {
		//add to gatabase new pokemon 
		if(pokContext.isWinner) {
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
				{ pokContext.selectedPoks.map(card => {
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
				{ pokContext.opponentPoks.map(card => {
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

/*
На финальной странице игры отрисовуются карточки покемонов друг напротив друга, и если есть победитель по результату игры, то можно забрать одного покемона из колоды опонента, кликнув по нему один раз. Клик на желаемого покемона записывает его в STATE и потом оттуда он достается при записи в database перевого игрока, если он победил. Запись в БД происходит при условии что есть победитель и после нажатия кнопки END GAME. После добавления в БД нового покемона игра заканчивается полностью и нас через history.push('/game') перебрасывает на старт новой игры.

Также на странице реализован запрет перехода на нее по прямому URL-у через выполнение условий:

	if((pokContext.selectedPoks.length === 0) || (pokContext.opponentPoks.length === 0)) {
		history.push('/game');
	}

т.о. мы не можем попасть на страницу Finish Page вбив вручную в URL адрес '.../game/finish', а только после получения результата игры (win/lose/draw) на странице Board Page.
*/