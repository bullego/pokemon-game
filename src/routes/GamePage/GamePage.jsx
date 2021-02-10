import {useState} from 'react';
import {useRouteMatch, Route, Switch, Redirect} from 'react-router-dom';
import StartPage from './routes/StartPage';
import BoardPage from './routes/BoardPage';
import FinishPage from './routes/FinishPage';
import { PokemonContext } from '../../context/pokemonContext';
import { useLastLocation } from 'react-router-last-location';


const GamePage = () => {
	const match = useRouteMatch();
	const lastLocation = useLastLocation();

	const [selectedPoks, setSelectedPoks] = useState([]);
	
	if(selectedPoks.length > 0) {
		if(lastLocation && (lastLocation.pathname === '/game/board' || lastLocation.pathname === '/game/finish')) {
			setSelectedPoks([])
			lastLocation.pathname = ''		
		}
	}

	const addSelectedPokemon = (newSelectedPok) => {
		if(selectedPoks.find(pok => pok.id === newSelectedPok.id)) {			
			const index = selectedPoks.findIndex(pok => pok.id === newSelectedPok.id);
			
			const newState = [
				...selectedPoks.slice(0, index),
				...selectedPoks.slice(index+1)
			]
			
			setSelectedPoks(newState)
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

	return (
		<PokemonContext.Provider value={{
			selectedPoks,
			addSelectedPokemon
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