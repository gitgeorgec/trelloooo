import {
	createStore as reduxCreateStore,
	applyMiddleware,
} from 'redux';
import loggerMiddleWare from 'redux-logger';
import firebaseMiddleWares from '../firebase/middlewares';
import { configFirebaseListener } from '../firebase';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { reducer } from './redux';

if (!process.env) {
	process.env = {};
}

export function createStore(initState = {}, options = {}) {
	let middlewares;
	let store;

	if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'pre-production') {
		middlewares = [
			...firebaseMiddleWares,
		];
		store = reduxCreateStore(reducer, initState, applyMiddleware(...middlewares));
	} else {
		middlewares = [
			...firebaseMiddleWares,
			loggerMiddleWare,
		];
		store = reduxCreateStore(reducer, initState, composeWithDevTools(applyMiddleware(...middlewares)));
	}

	configFirebaseListener(store);

	return store;
}

export const StoreProvider = Provider;
