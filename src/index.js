import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import App from './App';
import store from './redux/store';
import './index.css';


const MainApp = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<App/>
			</BrowserRouter>
		</Provider>
	)
}

ReactDOM.render(<MainApp/>, document.getElementById('root'));