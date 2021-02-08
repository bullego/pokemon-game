import {useRouteMatch, Route, Switch, Redirect} from 'react-router-dom';
import MenuHeader from './components/MenuHeader';
import Footer from './components/Footer';
import HomePage from './routes/HomePage';
import GamePage from './routes/GamePage';
import AboutPage from './routes/AboutPage';
import ContactPage from './routes/ContactPage';
import NotFoundPage from './routes/NotFound';
import classnames from 'classnames';
import stl from './App.module.css';


const App = () => {
	const match = useRouteMatch('/');

  return (		
		<Switch>
			<Route path='/404' component={NotFoundPage}/>
			
			<Route>
				<>
					<MenuHeader bgActive={!match.isExact}/>

					<div className={classnames(stl.page_wrap, {[stl.isHomePage]: match.isExact})}>
						<Switch>
							<Route path='/' exact component={HomePage}/>
							<Route path='/game' component={GamePage}/>
							<Route path='/about' component={AboutPage}/>
							<Route path='/contact' component={ContactPage}/>
							<Route render={() => <Redirect to='/404'/>}/>		
						</Switch>
					</div>

					<Footer/>
				</>
			</Route>			
		</Switch>
  )
}

export default App;