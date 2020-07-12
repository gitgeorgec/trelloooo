import React, { createContext } from 'react';
import { firebaseConfig } from './config';
import app from 'firebase/app';
import { authActions } from '../repositories/redux/actions';
import 'firebase/database';
import 'firebase/auth';

const {
	logoutSuccessAction,
	loginSuccessAction,
} = authActions;

const FirebaseContext = createContext(null);

let firebase = {
	app: null,
	database: null,
	auth: null,
};

if (!app.apps.length) {
	app.initializeApp(firebaseConfig);

	firebase = {
		app: app,
		database: app.database(),
		auth: app.auth(),
	};
}

export function configFirebase({ dispatch, state }) {
	// Check Auth
	firebase.auth.onAuthStateChanged(function (user) {
		if (user) {
			dispatch(loginSuccessAction());
		} else {
			dispatch(logoutSuccessAction());
		}
	});
}

export function FirebaseContextWrapper({ children }) {
	return (
		<FirebaseContext.Provider value={firebase}>
			{children}
		</FirebaseContext.Provider>
	);
}

export { FirebaseContext, firebase };
