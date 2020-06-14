import { actionTypes } from '../actions';
import { LoadingStatusEnum } from '../../../lib/enums';
import produce from 'immer';

const { NONE, LOADING, SUCCESS, FAILED } = LoadingStatusEnum;
const {
	START_LOGIN,
	LOGIN_SUCCESS,
	LOGIN_FAILED,
} = actionTypes;

const initState = {
	isAuthed: false,
	loadingStatus: NONE,
	error: {},
};

const authReducer = produce((draftState = initState, action) => {
	switch (action.type) {
		case START_LOGIN: {
			draftState.loadingStatus = LOADING;

			return draftState;
		}

		case LOGIN_SUCCESS: {
			draftState.loadingStatus = SUCCESS;
			draftState.isAuthed = true;

			return draftState;
		}

		case LOGIN_FAILED: {
			draftState.loadingStatus = FAILED;
			draftState.isAuthed = false;

			return draftState;
		}

		default:
			return draftState;
	}
});

export default authReducer;
