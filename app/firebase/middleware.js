import { firebase } from './index';
import {
	actionTypes,
	authActions,
} from '../repositories/redux/actions';

const {
	START_LOGIN,
	START_LOGOUT,
	START_SIGNUP,
} = actionTypes;
const {
	loginSuccessAction,
	loginFailedAction,
	signUpSuccessAction,
	signUpFailedAction,
	logoutSuccessAction,
	logoutFailedAction,
} = authActions;

const firebaseMiddleware = store => next => action => {
	const { dispatch } = store;

	switch (action.type) {
		case START_LOGIN: {
			const { email, password } = action;

			firebase.auth
				.signInWithEmailAndPassword(email, password)
				.then(data => {
					dispatch(loginSuccessAction());
				})
				.catch(err => {
					dispatch(loginFailedAction(err));
				});
			break;
		}

		case START_LOGOUT: {
			firebase.auth
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
			const { email, password } = action;

			firebase.auth
				.createUserWithEmailAndPassword(email, password)
				.then(res => {
					console.log(res);
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
