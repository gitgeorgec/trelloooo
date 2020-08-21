import {
	START_UPDATE_TRELLO_COLUMNS,
	UPDATE_TRELLO_COLUMNS_SUCCESS,
	UPDATE_TRELLO_COLUMNS_FAILED,
} from './action-types';

export function updateTrelloColumnsAction(dashboardId) {
	return {
		type: START_UPDATE_TRELLO_COLUMNS,
		dashboardId,
	};
}

export function updateTrelloColumnsSuccessAction(columns = []) {
	return {
		type: UPDATE_TRELLO_COLUMNS_SUCCESS,
		columns,
	};
}

export function updateTrelloColumnsFailedAction(error) {
	return {
		type: UPDATE_TRELLO_COLUMNS_FAILED,
		error,
	};
}
