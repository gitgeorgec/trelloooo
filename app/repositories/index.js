import {
	createStore as reduxCreateStore,
	applyMiddleware,
} from 'redux';
import loggerMiddleWare from 'redux-logger';
import firebaseMiddleWare from '../firebase/middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { reducer } from './redux';

// TODO get config file;
const config = {
	mode: 'dev',
};

export function createStore(initState = {}, options = {}) {
	let middlewares;
	let store;

	if (config.mode === 'production' || config.mode === 'pre-production') {
		middlewares = [
			firebaseMiddleWare,
		];
		store = reduxCreateStore(reducer, initState, applyMiddleware(...middlewares));
	} else {
		middlewares = [
			firebaseMiddleWare,
			loggerMiddleWare,
		];
		store = reduxCreateStore(reducer, initState, composeWithDevTools(applyMiddleware(...middlewares)));
	}

	return store;
}

export const StoreProvider = Provider;
