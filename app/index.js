import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, StoreProvider } from './repositories';
import FirebaseProvider from './firebase';
import App from './app';

const store = createStore();

ReactDOM.render(
	<StoreProvider store={store}>
		{/* <FirebaseProvider> */}
			<BrowserRouter>
				<App/>
			</BrowserRouter>
		{/* </FirebaseProvider> */}
	</StoreProvider>,
	document.getElementById('root')
);
