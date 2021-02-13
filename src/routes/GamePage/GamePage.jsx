import {useState} from 'react';
import {useRouteMatch, Route, Switch, Redirect} from 'react-router-dom';
import StartPage from './routes/StartPage';
import BoardPage from './routes/BoardPage';
import FinishPage from './routes/FinishPage';
import { PokemonContext } from '../../context/pokemonContext';


const GamePage = () => {
	const match = useRouteMatch();

	const [selectedPoks, setSelectedPoks] = useState([]);
	const [opponentPoks, setOpponentPoks] = useState([]);
	const [isWinner, setIsWinner] = useState(false);

	const clearSelectedPoksFromContext = () => {
		setSelectedPoks([])
	}

	const clearOpponentPoksFromContext = () => {
		setOpponentPoks([])
	}

	const addSelectedPokemon = (newSelectedPok) => {
		if(selectedPoks.find(pok => pok.id === newSelectedPok.id)) {			
			const index = selectedPoks.findIndex(pok => pok.id === newSelectedPok.id);
			
			const poksAfterUnselected = [
				...selectedPoks.slice(0, index),
				...selectedPoks.slice(index+1)
			]
			
			setSelectedPoks(poksAfterUnselected)
		}
		else {
			setSelectedPoks(prevState => {
				return [
					...prevState,
					newSelectedPok
				]
			});
		}
	}

	const addOpponentPokemon = (opponentPoks) => {
		setOpponentPoks(prevState => {
			return [
				...prevState,
				...opponentPoks
			]
		})
	}

	return (
		<PokemonContext.Provider value={{
			selectedPoks,
			addSelectedPokemon,
			clearSelectedPoksFromContext,
			opponentPoks,
			addOpponentPokemon,
			clearOpponentPoksFromContext,
			isWinner,
			setIsWinner
		}}>
			<Switch>
				<Route path={`${match.path}/`} exact component={StartPage} />
				<Route path={`${match.path}/board`} component={BoardPage} />
				<Route path={`${match.path}/finish`} component={FinishPage} />
				
				<Route render={() => <Redirect to='/404'/>}/>	
			</Switch>
		</PokemonContext.Provider>
	);
};

export default GamePage;