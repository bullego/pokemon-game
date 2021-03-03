import {useLocation, Route, Switch, Redirect} from 'react-router-dom';
import {NotificationContainer} from 'react-notifications';
import MenuHeader from './components/MenuHeader';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import HomePage from './routes/HomePage';
import GamePage from './routes/GamePage';
import AboutPage from './routes/AboutPage';
import ContactPage from './routes/ContactPage';
import NotFoundPage from './routes/NotFound';
import 'react-notifications/lib/notifications.css';
import classnames from 'classnames';
import stl from './App.module.css';


const App = () => {
	const location = useLocation();
	const isPadding = location.pathname === '/'	||
									  location.pathname === '/game/board'	|| 
										location.pathname === '/game/finish';
	const isToggleFooter = location.pathname === '/game/board' || 
												 location.pathname === '/game/finish';

  return (
		<>
			<Switch>
				<Route path='/404' component={NotFoundPage}/>
				
				<Route>
					<>
						<MenuHeader bgActive={!isPadding}/>

						<div className={classnames(stl.page_wrap, {[stl.isHomePage]: isPadding})}>
							<Switch>
								<Route path='/' exact component={HomePage}/>
								<PrivateRoute path='/game' component={GamePage}/>
								<PrivateRoute path='/about' component={AboutPage}/>
								<PrivateRoute path='/contact' component={ContactPage}/>
								<Route render={() => <Redirect to='/404'/>}/>		
							</Switch>
						</div>

						<Footer isFooter={isToggleFooter}/>
					</>
				</Route>			
			</Switch>
			<NotificationContainer/>
		</>
  )
}

export default App;