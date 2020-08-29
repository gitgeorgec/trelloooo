import {
	START_CREATE_TRELLO_COLUMN,
	CREATE_TRELLO_COLUMN_SUCCESS,
	CREATE_TRELLO_COLUMN_FAILED,
	START_UPDATE_TRELLO_COLUMNS,
	UPDATE_TRELLO_COLUMNS_SUCCESS,
	UPDATE_TRELLO_COLUMNS_FAILED,
	START_DELETE_TRELLO_COLUMN,
	DELETE_TRELLO_COLUMNS_SUCCES,
	DELETE_TRELLO_COLUMNS_FAILE,
	SUBSCRIBE_TRELLO_COLUMNS,
	UNSUBSCRIBE_TRELLO_COLUMNS,
	SET_TRELLO_COLUMN,
} from './action-types';

export function createTrelloColumnAction(columnName, dashboardId) {
	return {
		type: START_CREATE_TRELLO_COLUMN,
		columnName,
		dashboardId,
	};
}

export function createTrelloColumnSuccessAction() {
	return {
		type: CREATE_TRELLO_COLUMN_SUCCESS,
	};
}

export function createTrelloColumnFailedAction(error) {
	return {
		type: CREATE_TRELLO_COLUMN_FAILED,
		error,
	};
}

export function updateTrelloColumnsAction(columns = []) {
	return {
		type: START_UPDATE_TRELLO_COLUMNS,
		columns,
	};
}

export function updateTrelloColumnsSuccessAction() {
	return {
		type: UPDATE_TRELLO_COLUMNS_SUCCESS,
	};
}

export function updateTrelloColumnsFailedAction(error) {
	return {
		type: UPDATE_TRELLO_COLUMNS_FAILED,
		error,
	};
}

export function deleteTrelloColumnAction(columnId) {
	return {
		type: START_DELETE_TRELLO_COLUMN,
		columnId,
	};
}

export function deleteTrelloColumnSuccessAction() {
	return {
		type: DELETE_TRELLO_COLUMNS_SUCCES,
	};
}

export function deleteTrelloColumnFailedAction(error) {
	return {
		type: DELETE_TRELLO_COLUMNS_FAILE,
		error,
	};
}

export function subscribeTrelloColumnsAction(dashboardId) {
	return {
		type: SUBSCRIBE_TRELLO_COLUMNS,
		dashboardId,
	};
}

export function unsubscribeTrelloColumnsAction() {
	return {
		type: UNSUBSCRIBE_TRELLO_COLUMNS,
	};
}

export function setTrelloColumnAction(columnId, column) {
	return {
		type: SET_TRELLO_COLUMN,
		columnId,
		column,
	};
}
