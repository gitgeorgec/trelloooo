import { firebase } from './index';
import {
	actionTypes,
	authActions,
} from '../repositories/redux/actions';

const { START_LOGIN } = actionTypes;
const {
	loginSuccessAction,
	loginFailedAction,
} = authActions;

const firebaseMiddleware = store => next => action => {
	const { dispatch } = store;

	if (action.type === START_LOGIN) {
		const { email, password } = action;

		firebase.auth
			.signInWithEmailAndPassword(email, password)
			.then(data => {
				dispatch(loginSuccessAction());
			})
			.catch(err => {
				dispatch(loginFailedAction(err));
			});
	}

	return next(action);
};

export default firebaseMiddleware;
