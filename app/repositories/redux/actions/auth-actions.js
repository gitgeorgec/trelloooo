import {
	START_LOGIN,
	LOGIN_SUCCESS,
	LOGIN_FAILED,
} from './action-types';

export function loginAction(email, password) {
	return {
		type: START_LOGIN,
		email,
		password,
	};
}

export function loginSuccessAction() {
	return {
		type: LOGIN_SUCCESS,
	};
}

export function loginFailedAction() {
	return {
		type: LOGIN_FAILED,
	};
}
