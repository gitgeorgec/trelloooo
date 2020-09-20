import { firebase } from '../index';
import {
	actionTypes,
	authActions,
	dashboardActions,
} from '../../repositories/redux/actions';

const {
	START_LOGIN,
	START_LOGOUT,
	START_SIGNUP,
} = actionTypes;
const {
	signUpSuccessAction,
	signUpFailedAction,
} = authActions;
const {
	unsubscribeDashboardAction,
} = dashboardActions;
const { database, auth } = firebase;
const UsersRef = database.collection('users');

const firebaseAuthMiddleware = store => next => action => {
	const { dispatch } = store;

	switch (action.type) {
		case START_LOGIN: {
			const { email, password } = action;

			auth.signInWithEmailAndPassword(email, password);

			break;
		}

		case START_LOGOUT: {
			dispatch(unsubscribeDashboardAction());

			setTimeout(() => {
				auth.signOut();
			}, 200);
			break;
		}

		case START_SIGNUP: {
			const { email, password, username } = action;

			auth.createUserWithEmailAndPassword(email, password)
				.then(res => {
					UsersRef.doc(res.user.uid).set({
						email,
						username,
						dashboardIds: [],
					});
					dispatch(signUpSuccessAction());
				})
				.catch(err => dispatch(signUpFailedAction(err)));

			break;
		}

		default:
			break;
	}

	return next(action);
};

export default firebaseAuthMiddleware;
