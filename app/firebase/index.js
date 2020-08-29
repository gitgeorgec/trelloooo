import React, { createContext } from 'react';
import { firebaseConfig } from './config';
import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import {
	authActions,
	userActions,
	dashboardActions,
} from '../repositories/redux/actions';

const {
	logoutSuccessAction,
	loginSuccessAction,
} = authActions;
const {
	setUserAction,
} = userActions;
const {
	subscribeDashboardAction,
} = dashboardActions;

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
		database: app.firestore(),
		auth: app.auth(),
	};
}

export function configFirebaseListener({ dispatch, getState }) {
	const database = firebase.database;
	const UsersRef = database.collection('users');

	// Check Auth
	// Subscrible Auth changes
	firebase.auth.onAuthStateChanged(function (user) {
		if (user) {
			const userId = user.uid;

			UsersRef.doc(userId)
				.get()
				.then(doc => {
					const userData = doc.data();

					dispatch(setUserAction(userData));
					dispatch(subscribeDashboardAction(userId));
				})
				.catch(err => console.error(err));

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
