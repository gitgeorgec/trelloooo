import {
	START_CREATE_TRELLO_CARD,
	CREATE_TRELLO_CARD_SUCCESS,
	CREATE_TRELLO_CARD_FAILED,
	START_UPDATE_TRELLO_CARDS,
	UPDATE_TRELLO_CARDS_SUCCESS,
	UPDATE_TRELLO_CARDS_FAILED,
	START_DELETE_TRELLO_CARD,
	DELETE_TRELLO_CARD_SUCCESS,
	DELETE_TRELLO_CARD_FAILED,
	SUBSCRIBE_TRELLO_CARDS,
	UNSUBSCRIBE_TRELLO_CARDS,
	SET_TRELLO_CARD,
} from './action-types';

export function createTrelloCardAction(title, columnId, dashboardId) {
	return {
		type: START_CREATE_TRELLO_CARD,
		title,
		columnId,
		dashboardId,
	};
}

export function createTrelloCardSuccessAction() {
	return {
		type: CREATE_TRELLO_CARD_SUCCESS,
	};
}

export function createTrelloCardFailedAction(error) {
	return {
		type: CREATE_TRELLO_CARD_FAILED,
		error,
	};
}

export function updateTrelloCardsAction(cards = []) {
	return {
		type: START_UPDATE_TRELLO_CARDS,
		cards,
	};
}

export function updateTrelloCardsSuccessAction() {
	return {
		type: UPDATE_TRELLO_CARDS_SUCCESS,
	};
}

export function updateTrelloCardsFailedAction(error) {
	return {
		type: UPDATE_TRELLO_CARDS_FAILED,
		error,
	};
}

export function deleteTrelloCardAction(cardId, columnId) {
	return {
		type: START_DELETE_TRELLO_CARD,
		cardId,
		columnId,
	};
}

export function deleteTrelloCardSuccessAction() {
	return {
		type: DELETE_TRELLO_CARD_SUCCESS,
	};
}

export function deleteTrelloCardFailedAction(error) {
	return {
		type: DELETE_TRELLO_CARD_FAILED,
		error,
	};
}

export function subscriptTrelloCardsAction(dashboardId) {
	return {
		type: SUBSCRIBE_TRELLO_CARDS,
		dashboardId,
	};
}

export function unsubscriptTrelloCardsAction() {
	return {
		type: UNSUBSCRIBE_TRELLO_CARDS,
	};
}

export function setTrelloCard(cardId, card) {
	return {
		type: SET_TRELLO_CARD,
		cardId,
		card,
	};
}
