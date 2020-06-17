import {
	START_LOGIN,
	LOGIN_SUCCESS,
	LOGIN_FAILED,
	START_LOGOUT,
	LOGOUT_SUCCESS,
	LOGOUT_FAILED,
	START_SIGNUP,
	SIGNUP_SUCCESS,
	SIGNUP_FAILED,
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

export function loginFailedAction(error) {
	return {
		type: LOGIN_FAILED,
		error,
	};
}

export function logoutAction() {
	return {
		type: START_LOGOUT,
	};
}

export function logoutSuccessAction() {
	return {
		type: LOGOUT_SUCCESS,
	};
}

export function logoutFailedAction(error) {
	return {
		type: LOGOUT_FAILED,
		error,
	};
}

export function signUpAction(email, password) {
	return {
		type: START_SIGNUP,
		email,
		password,
	};
}

export function signUpSuccessAction() {
	return {
		type: SIGNUP_SUCCESS,
	};
}

export function signUpFailedAction(error) {
	return {
		type: SIGNUP_FAILED,
		error,
	};
}
