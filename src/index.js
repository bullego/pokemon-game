import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import './index.css';
import { LastLocationProvider } from 'react-router-last-location';

const MainApp = () => {
	return (
		<BrowserRouter>
			<LastLocationProvider>
				<App/>
			</LastLocationProvider>
		</BrowserRouter>
	)
}

ReactDOM.render(<MainApp/>, document.getElementById('root'));