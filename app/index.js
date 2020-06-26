import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, StoreProvider } from './repositories';
import App from './app';

const store = createStore();

ReactDOM.render(
	<StoreProvider store={store}>
		<BrowserRouter>
			<App/>
		</BrowserRouter>
	</StoreProvider>,
	document.getElementById('root')
);
