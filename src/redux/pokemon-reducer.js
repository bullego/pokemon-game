import {fetchOpponentPokemons, fetchBoard, fetchCombineBoard} from '../api/api';

const SET_POKEMONS = 'SET_POKEMONS';
const SET_SELECTED_POK = 'SET_SELECTED_POK';
const REMOVE_UNSELECTED_POK = 'REMOVE_UNSELECTED_POK';
const CLEAR_SELECTED_POKS = 'CLEAR_SELECTED_POKS';
const SET_IS_WINNER_PLAYER = 'SET_IS_WINNER_PLAYER';
const SET_OPPONENT_POKS = 'SET_OPPONENT_POKS';
const CLEAR_OPPONENT_POKS = 'CLEAR_OPPONENT_POKS';
const SET_BOARD = 'SET_BOARD';
const SET_COMBINE_BOARD = 'SET_COMBINE_BOARD';


const initialState = {
	pokemonData: {},
	opponentPokemonData: [],
	boardData: [],
	combineBoardData: [],
	selectedPoks: [],
	isWinner: false,
}

//reducer
const pokemonReducer = (state = initialState, action) => {
	switch(action.type) {
		case SET_POKEMONS:
			return {
				...state,
				pokemonData: {...state.pokemonData, ...action.pokemons}
			}
		case SET_SELECTED_POK:
			return {
				...state,
				selectedPoks: [...state.selectedPoks, action.newSelectedPok]
			}
		case REMOVE_UNSELECTED_POK:
			return {
				...state,
				selectedPoks: [...action.poksAfterUnselected]
			}
		case CLEAR_SELECTED_POKS:
			return {
				...state,
				selectedPoks: []
			}
		case SET_IS_WINNER_PLAYER:
			return {
				...state,
				isWinner: action.isWinner
			}
		case SET_OPPONENT_POKS: 
			return {
				...state,
				opponentPokemonData: [...action.opponentPokemons]
			}
		case CLEAR_OPPONENT_POKS:
			return {
				...state,
				opponentPokemonData: []
			}
		case SET_BOARD:
			return {
				...state,
				boardData: [...action.board]
			}
		case SET_COMBINE_BOARD:
			return {
				...state,
				combineBoardData: [...action.combineBoardData]
			}
		default:
			return state;
	}
}
export default pokemonReducer;



//Action Creator
export const setPokemonsAC = (pokemons) => {
	return {
		type: SET_POKEMONS,
		pokemons
	}
}

export const setSelectedPokAC = (newSelectedPok) => {
	return {
		type: SET_SELECTED_POK,
		newSelectedPok
	}
}

export const removeUnselectedPokAC = (poksAfterUnselected) => {
	return {
		type: REMOVE_UNSELECTED_POK,
		poksAfterUnselected
	}
}

export const clearSelectedPoksAC = () => {
	return {
		type: CLEAR_SELECTED_POKS
	}
}

export const setIsWinnerPlayerAC = (isWinner) => {
	return {
		type: SET_IS_WINNER_PLAYER,
		isWinner
	}
}

export const setOpponentPoksAC = (opponentPokemons) => {
	return {
		type: SET_OPPONENT_POKS,
		opponentPokemons
	}
}

export const clearOpponentPoksAC = () => {
	return {
		type: CLEAR_OPPONENT_POKS
	}
}

export const setBoardAC = (board) => {
	return {
		type: SET_BOARD,
		board
	}
}

export const setCombineBoardAC = (combineBoardData) => {
	return {
		type: SET_COMBINE_BOARD,
		combineBoardData
	}
}

//Thunk Creator
export const getOpponentPoksTC = () => async (dispatch) => {
	try {
		const res = await fetchOpponentPokemons();
		const opponentPoks = res.data;
		// console.log('---> data opponentPoks: ', opponentPoks);
		dispatch(setOpponentPoksAC(opponentPoks))
	}
	catch(error) {
		alert(`Get opponent pokemons ${error}`)
	}
};

export const getBoardTC = () => async (dispatch) => {
	try {
		const res = await fetchBoard();
		const board = res.data;
		// console.log('---> data board: ', board);
		dispatch(setBoardAC(board))
	}
	catch(error) {
		alert(`Get board ${error}`)
	}
};

export const combineCardWithBoardTC = (params) => async (dispatch) => {
	try {
		const res = await fetchCombineBoard(params);
		const combineBoardData = res.data;
		// console.log('---> data board: ', combineBoardData);
		dispatch(setCombineBoardAC(combineBoardData))
	}
	catch(error) {
		alert(`Get board ${error}`)
	}
};