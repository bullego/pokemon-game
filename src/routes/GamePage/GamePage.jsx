import {useRouteMatch, Route, Switch, Redirect} from 'react-router-dom';
import StartPage from './routes/StartPage';
import BoardPage from './routes/BoardPage';
import FinishPage from './routes/FinishPage';


const GamePage = () => {
	const match = useRouteMatch();

	return (
		<Switch>
			<Route path={`${match.path}/`} exact component={StartPage} />
			<Route path={`${match.path}/board`} component={BoardPage} />
			<Route path={`${match.path}/finish`} component={FinishPage} />
			
			<Route render={() => <Redirect to='/404'/>}/>	
		</Switch>
	);
};

export default GamePage;