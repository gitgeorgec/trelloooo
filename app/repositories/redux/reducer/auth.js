import { actionTypes } from '../actions';
import { LoadingStatusEnum } from '../../../lib/enums';
import produce from 'immer';

const { NONE, LOADING, SUCCESS, FAILED } = LoadingStatusEnum;
const {
	START_LOGIN,
	LOGIN_SUCCESS,
	LOGIN_FAILED,
	START_LOGOUT,
	LOGOUT_SUCCESS,
	LOGOUT_FAILED,
	START_SIGNUP,
	SIGNUP_SUCCESS,
	SIGNUP_FAILED,
} = actionTypes;

const initState = {
	isAuthed: false,
	loginLoadingStatus: NONE,
	signUpLoadingStatus: NONE,
	error: {},
};

const authReducer = produce((draftState = initState, action) => {
	switch (action.type) {
		case START_LOGIN: {
			draftState.loginLoadingStatus = LOADING;

			return draftState;
		}

		case LOGIN_SUCCESS: {
			draftState.loginLoadingStatus = SUCCESS;
			draftState.isAuthed = true;

			return draftState;
		}

		case LOGIN_FAILED: {
			const { error } = action;

			draftState.loginLoadingStatus = FAILED;
			draftState.error = error;

			return draftState;
		}

		case START_LOGOUT: {
			draftState.loginLoadingStatus = LOADING;

			return draftState;
		}

		case LOGOUT_SUCCESS: {
			draftState.loginLoadingStatus = SUCCESS;
			draftState.isAuthed = false;

			return draftState;
		}

		case LOGOUT_FAILED: {
			const { error } = action;

			draftState.loginLoadingStatus = FAILED;
			draftState.error = error;

			return draftState;
		}

		case START_SIGNUP: {
			draftState.signUpLoadingStatus = LOADING;

			return draftState;
		}

		case SIGNUP_SUCCESS: {
			draftState.signUpLoadingStatus = SUCCESS;

			return draftState;
		}

		case SIGNUP_FAILED: {
			const { error } = action;

			draftState.signUpLoadingStatus = FAILED;
			draftState.error = error;

			return draftState;
		}

		default:
			return draftState;
	}
});

export default authReducer;
