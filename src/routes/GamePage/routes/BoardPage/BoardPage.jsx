import {useContext, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
// import {PokemonContext} from '../../../../context/pokemonContext';
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

	console.log('TEST board: ', board);
	console.log('TEST boardData: ', boardData);
	console.log('TEST combineBoardData: ', combineBoardData);

	if(selectedPoks.length === 0) {
		history.replace('/game');
  }

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

	
  // useEffect(() => {
  // 	if(playerSteps === 9) {
  // 		const [player1Count, player2Count] = counterWinCards(board, player1, player2);

  // 		if(player1Count > player2Count) {
  // 			setWinType('win');
  // 			dispatch(setIsWinnerPlayerAC(true));
  // 			setTimeout(() => history.push('/game/finish'), 2000)
  // 		}
  // 		else if(player1Count < player2Count) {
  // 			setWinType('lose');
  // 			setTimeout(() => history.push('/game/finish'), 2000)
  // 		}
  // 		else {
  // 			setWinType('draw');
  // 			setTimeout(() => history.push('/game/finish'), 2000)
  // 		}
  // 	}
  // }, [playerSteps])


  const handleClickSquare = async (squarePosition) => {
    //match selected card with empty square using backend
		if(chosenCard) {
      const params = {
        position: squarePosition,
        card: chosenCard,
				board
      }

      const updatedBoard = await dispatch(combineCardWithBoardTC(params))

      //refresh STATE (remove card from player1 or player2) after match card with board
			if(chosenCard.playerNumber === 1) {
				setPlayer1(prevState => prevState.filter(card => card.id !== chosenCard.id));
      }
			if(chosenCard.playerNumber === 2) {
				setPlayer2(prevState => prevState.filter(card => card.id !== chosenCard.id));
      }

      setBoard(updatedBoard)

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

--------------------

Рандомный выбор первого хода (при загрузке определяем кто ходит первый) реализуем через (Math.random()<.5)+1 который будет отдавать рандомно 1 или 2. Эти цифры (или 1 или 2) получаем при первой отрисовке в useEffect-е и будем записывать их в состояние randomPlayerNumber. Цифры нужны для передачи их в комопнент <PlayerBoard randomPlayerNumber={randomPlayerNumber} .../> для использования в условиях возможности/невозможности первого хода того или иного игрока: 

	if(playerNumber === randomPlayerNumber && (playerSteps%2 === 0)) {...} ходит 1-й игрок
	if(playerNumber === (randomPlayerNumber === 1 ? 2 : 1) && (playerSteps%2 !== 0)) {...} ходит 2-й

В этих двух условиях также реализован запрет повторного хода (т.е. нельзя выбрать после сделанного хода еще раз покемона и положить его на игровое поле)

Также подключаем два новых Компонента вывода результата игры <Result/> и спинера для выбора игрока который сделает первый ход <ArrowChoice/>
*/
