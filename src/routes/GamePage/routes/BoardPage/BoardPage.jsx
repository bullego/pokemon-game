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
		//refresh opponent pokemons (remove them from Context)
		(pokContext.opponentPoks.length > 0) && pokContext.clearOpponentPoksFromContext();

		//get board from backend and set to the STATE
		const boardResponse = await fetch(`${baseUrl}/board`);
		const boardRequest = await boardResponse.json();

		setBoard(boardRequest.data);

		//get opponent pokemons from backend and set to the Context and STATE
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
		//match selected card with empty square using backend
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
			
			//refresh STATE (remove card from player1 or player2) after match card with board
			if(chosenCard.playerNumber === 1) {
				setPlayer1(prevState => prevState.filter(card => card.id !== chosenCard.id));
			}
			if(chosenCard.playerNumber === 2) {
				setPlayer2(prevState => prevState.filter(card => card.id !== chosenCard.id));
			}

			setBoard(matchCardToBoard.data);

			//count player steps to win/lose/draw
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

/*
После выбора 5-ки покемонов и перехода на стр. Board Page при отрисовке страницы мы сразу видим слева наших 5 покемонов. Этих покемонов мы достали из Контекста, расширили на +1 св-во (possession: 'blue') и записали в STATE(массив) player1.
Чуть позже отрисовуется игровая доска и 5-ка покемонов справа (оппоненты). Доска и покемоны подтягиваются с сервера и мы их записываем в STATE(массивы) в board и player2 соответственно, расширив перед этим каждого покемона на +1 св-во (possession: 'red'). Это доп. св-во нам нужно будет для закрашивания завоеванного покемона в цвет покемона-победителя.

Итак, мы видим отрисованных покемонов слева взятых из Контекста и присвоенных в STATE (в массив player1), доску board и покемонов справа взятых с сервера и присвоенных в STATE (в массив player2). Мы добавляем левых и правых покоменов в состояние, чтоб была возможность потом их удалять из списка после перемещения их на игровое поле.

Если обновить страницу, Контекст обнуляется и все покемоны, которые туда были записаны исчезают. Т.о. нам нужно заново добавить свою 5-ку покемонов в Контекст, а, соответственно, перейти назад на страницу Game Page где лежат все наши покемоны. Переход на Game Page осуществиться через обьект history хука useHistory() и метода replace: history.replace('/game') который вернет нас на шаг назад, т.е. с Board Page на Game Page.

Ход игры:
Нужно выбрать одного своего покемона (он сместиться влево) и кликнуть на одном из 9-ти пустых полей игровой доски. Покемон исчезнет из списка и появится на выбраном поле доски перекрасившись в свой цвет (синий или красный). Дальше второй игрок выбирает своего покемона и делает также размещает его на доске. Если покемоны оказались рядо, сравниваются value сторон соприкосновения и побеждает тот покемон, который имеет большее value. В конце игры побеждает тот игрок у которого больше захваченных (закрашенных в его цвет) покемонов. После определения результатов игры нас перебрасывает на страницу Finish Page, где можно забрать одного из покемонов опонета себе в коллекцию, если ты оказался победителем и закончить игру кнопкой Finish Game.

Итак, имеем два списка карточек и игровое поле. По клику на одну из карточек (выбираем покемона перед помещением его на игровое поле) она смещается влево (выделяется из списка) благодаря св-ву состояния isSelectedBoardCard комопненты PlayerBoard. PlayerBoard - это доска со списком покемонов. Эта доска отрисовует левые и правые карточки. Также, по клику на карточку мы передаем в метод onChosenCard(...) обьект карточки, расширенный на +1 св-во playerNumber. Итого мы расширили сначала каждую карточку на доп.св-во possession: blue или red и теперь по клику добавляем еще одно св-во playerNumber: 1 или 2.
После клика на карточку и добавления нужных доп.св-в мы должны кликнуть на одно из 9 пустых полей центральной игровой доски, чтоб переместить туда выбранную карту.
Дальше начинается "магия" в виде запросов на сервер...
Ставим обработчик клика на поля (9шт.) игровой доски и через метод handleClickSquare(square.position) передавая ему позицию выбранного пустого поля формируем данные "params" (позиция + карточка + текущее состояние доски) которые отправим на сервер для того, чтоб связать выбранное пустое поле и выбранную карточку покемона. Если отконсолить ответ сервера, то получим массив обьектов у которых есть 2 поля position и card. Все карточки = null кроме той, которую связали с полем игровой доски:

response:
	[
		{position: 1, card: null}
		{position: 2, card: null}
		...
		{position: 8, card: {name: 'pikachu', id: 22, playerNumber: 1, possession: blue, ...}}
		{position: 9, card: null}
	]

Теперь нужно обновить состояние plаyer1 и player2 т.к. мы забыраем карту со списка и перемещаем ее на игровое поле if(chosenCard.playerNumber === 1 или 2) -> отфильтровуем выбранную, а также состояние игровой доски, т.к. на 8-й позиции уже запилен покемон:
setBoard(response).
Когда отрисовуется карточка покемона на выбранном поле мы компоненту карты <PokemonCard/> передаем по-мимо самой карточки еще и доп. атрибуты minimize и isActiveCard для отображения в поле мини-версии карты лицевой стороной к нам.

Теперь можно выбирать карточки у обеих игроков и ставить их в игровое поле. Но главное понимать какой покемон захватит другого и перекрасит побежденного в свой цвет. Сейчас же все покемоны на игровой доске имеют разные цвета (не синий или красный, а цвета своих карточек). Для этого используем доп.св-во possession (может быть blue или red) которое добавим в компонент <PokemonCard/>:

	<div className={classnames(stl.pokemon, stl[type], stl[possession])}>...</div>

теперь все добавленные на доску карточки будут окрашиваться в синий или красный цвет в зависимости от того, какой игрок сделал ход (левый игрок закрашивает синим, правый - красным) или какой покемон захвалит другого.

После выкладывания всех покемонов на игровую доску нужно получить результат игры (выиграш, проиграш или ничья). Для этого заведем в STATE счетчик шагов playerSteps, который = 0 по умолчанию и будет увеличиваться на +1 каждый раз как был сделан один шаг:

	setPlayerSteps(prevState => {
		const count = prevState + 1
		return count
	})

это увеличение счетчика проходит в том же обработчике клика на поле handleClickSquare.
Теперь заведем еще один useEffect, который будет зависеть от шагов и считать кол-во закрашенных в один цвет карт, а также карты каторые остались не использованы в игре. Для этого создадим глобальную ф-ю counterWinCards(board, p1, p2), которая принимает доску (для подсчета карт красного и синего цвета) и карточки первого и второго игрока для подсчета не использованных карточек, если такие остались. Также внутри ф-ии проходим по массиву board и смотрим карточек какого цвета больше: синийх или красных и добавляем +1 к счетчику первого или второго игрока. Этот счетчик и будет возвращать эта глобальная ф-я:

	return [player1Count, player2Count]

В созданном useEffect-е который зависит от кол-ва шагов будем забирать player1Count и player2Count и сравнивая их определять победителя.

После любого результата игры, мы должны попасть на страницу Finish Game через history.push('/game/finish'), а в случае победы еще и записать в Контекст что есть победитель: pokContext.setIsWinner(true), чтоб использовать это состояние в Finish Page
*/