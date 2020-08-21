import { firebase } from './index';
import {
	actionTypes,
	authActions,
	userActions,
} from '../repositories/redux/actions';

const {
	START_LOGIN,
	START_LOGOUT,
	START_SIGNUP,
	START_UPDATE_TRELLO_COLUMNS,
} = actionTypes;
const {
	loginSuccessAction,
	loginFailedAction,
	signUpSuccessAction,
	signUpFailedAction,
	logoutSuccessAction,
	logoutFailedAction,
} = authActions;
const {
	setUserAction,
} = userActions;
const { database, auth } = firebase;
const UsersRef = database.collection('users');
const DashboardRef = database.collection('dashboard');
const ColumnRef = database.collection('column');
const CardRef = database.collection('card');

const firebaseMiddleware = store => next => action => {
	const { dispatch } = store;

	switch (action.type) {
		case START_LOGIN: {
			const { email, password } = action;

			auth.signInWithEmailAndPassword(email, password)
				.then(data => {
					const userUId = data.user.uid;

					UsersRef
						.doc(userUId).get().then(doc => {
							const userData = doc.data();

							dispatch(setUserAction(userData));
						});

					dispatch(loginSuccessAction());
				})
				.catch(err => {
					dispatch(loginFailedAction(err));
				});
			break;
		}

		case START_LOGOUT: {
			auth
				.signOut()
				.then(() => {
					dispatch(logoutSuccessAction());
				})
				.catch(err => {
					dispatch(logoutFailedAction(err));
				});

			break;
		}

		case START_SIGNUP: {
			const { email, password, username } = action;

			auth
				.createUserWithEmailAndPassword(email, password)
				.then(res => {
					UsersRef.doc(res.user.uid).set({
						email,
						username,
						dashboardIds: [],
					});
					dispatch(signUpSuccessAction());
				})
				.catch(err => {
					dispatch(signUpFailedAction(err));
				});

			break;
		}

		default:
			break;
	}

	return next(action);
};

export default firebaseMiddleware;
