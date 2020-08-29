import { actionTypes } from '../actions';
import { LoadingStatusEnum } from '../../../lib/enums';
import produce from 'immer';

const { NONE, LOADING, SUCCESS, FAILED } = LoadingStatusEnum;
const {
	START_CREATE_TRELLO_COLUMN,
	CREATE_TRELLO_COLUMN_SUCCESS,
	CREATE_TRELLO_COLUMN_FAILED,
	START_UPDATE_TRELLO_COLUMNS,
	UPDATE_TRELLO_COLUMNS_SUCCESS,
	UPDATE_TRELLO_COLUMNS_FAILED,
	START_DELETE_TRELLO_COLUMN,
	DELETE_TRELLO_COLUMNS_SUCCES,
	DELETE_TRELLO_COLUMNS_FAILE,
	SET_TRELLO_COLUMN,
} = actionTypes;

// Example
// data: {
// 	'columnId': {
// 		dashboardId: 'dashboardId',
// 		title: 'ColumnTitle',
// 		cardIds: ['cardId-1', 'cardID-2'],
// 	},

const initState = {
	data: {},

	loadingStatus: NONE,
	createLoadingStatus: NONE,
	deleteLoadingStatus: NONE,
	error: {},
};

const trelloColumn = produce((draftState = initState, action) => {
	switch (action.type) {
		case START_CREATE_TRELLO_COLUMN: {
			draftState.createLoadingStatus = LOADING;

			return draftState;
		}

		case CREATE_TRELLO_COLUMN_SUCCESS: {
			draftState.createLoadingStatus = SUCCESS;

			return draftState;
		}

		case CREATE_TRELLO_COLUMN_FAILED: {
			draftState.createLoadingStatus = FAILED;

			return draftState;
		}

		case START_UPDATE_TRELLO_COLUMNS: {
			draftState.loadingStatus = LOADING;

			return draftState;
		}

		case UPDATE_TRELLO_COLUMNS_SUCCESS: {
			draftState.loadingStatus = SUCCESS;

			return draftState;
		}

		case UPDATE_TRELLO_COLUMNS_FAILED: {
			draftState.loadingStatus = FAILED;
			draftState.error = action.error;

			return draftState;
		}

		case START_DELETE_TRELLO_COLUMN: {
			draftState.deleteLoadingStatus = LOADING;

			return draftState;
		}

		case DELETE_TRELLO_COLUMNS_SUCCES: {
			draftState.deleteLoadingStatus = SUCCESS;

			return draftState;
		}

		case DELETE_TRELLO_COLUMNS_FAILE: {
			draftState.deleteLoadingStatus = FAILED;

			return draftState;
		}

		case SET_TRELLO_COLUMN: {
			const { columnId, column } = action;

			if (column) {
				draftState.data[columnId] = column;
			} else {
				delete draftState.data[columnId];
			}

			return draftState;
		}

		default:
			return draftState;
	}
});

export default trelloColumn;

