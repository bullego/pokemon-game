import {useState} from 'react';
import {useRouteMatch, Route, Switch, Redirect} from 'react-router-dom';
import StartPage from './routes/StartPage';
import BoardPage from './routes/BoardPage';
import FinishPage from './routes/FinishPage';
import { PokemonContext } from '../../context/pokemonContext';


const GamePage = () => {
	
	const match = useRouteMatch();
	const [poks, setPoks] = useState([]);

	const addNewPokemon = (newPok) => {
		const newPoks = [...poks, newPok];
		setPoks(newPoks);
	}

	return (
		<PokemonContext.Provider value={{
			poks,
			addNewPokemon
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