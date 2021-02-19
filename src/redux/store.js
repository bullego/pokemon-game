import {combineReducers, createStore, compose, applyMiddleware} from 'redux';
import pokemonReducer from './pokemon-reducer';
import thunkMiddleware from 'redux-thunk';

const rootReducer = combineReducers({
	pokemons: pokemonReducer
})

//Chrome-extension (REDUX)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));
// store.subscribe(() => console.log('store sbscrb: ', store.getState()))

export default store;