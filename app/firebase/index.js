import React, { createContext } from 'react';
import { firebaseConfig } from './config';
import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import { authActions, userActions } from '../repositories/redux/actions';

const {
	logoutSuccessAction,
	loginSuccessAction,
} = authActions;
const {
	setUserAction,
} = userActions;

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

export function configFirebaseListener({ dispatch }) {
	const database = firebase.database;
	const UsersRef = database.collection('users');
	const DashboardRef = database.collection('dashboard');

	let unsubscribleDashboard = () => {};

	// Check Auth
	firebase.auth.onAuthStateChanged(function (user) {
		if (user) {
			// Subscrible changes
			UsersRef
				.doc(user.uid).get().then(doc => {
					const userData = doc.data();

					dispatch(setUserAction(userData));
				});

			unsubscribleDashboard = DashboardRef.where(`users.${user.uid}`, '==', true).onSnapshot(function (dashboards) {
				dashboards.docs.forEach(doc => console.log(doc.data()));
			});

			// Check Column

			dispatch(loginSuccessAction());
		} else {
			unsubscribleDashboard();

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
