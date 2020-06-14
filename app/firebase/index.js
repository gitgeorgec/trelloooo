import React, { createContext } from 'react';
import { firebaseConfig } from './config';
import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

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

export default ({ children }) => {
	return (
		<FirebaseContext.Provider value={firebase}>
			{children}
		</FirebaseContext.Provider>
	);
};

export { FirebaseContext, firebase };
