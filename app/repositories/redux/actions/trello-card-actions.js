import {
	START_CREATE_TRELLO_CARD,
	CREATE_TRELLO_CARD_SUCCESS,
	CREATE_TRELLO_CARD_FAILED,
	START_UPDATE_TRELLO_CARD,
	UPDATE_TRELLO_CARD_SUCCESS,
	UPDATE_TRELLO_CARD_FAILED,
} from './action-types';

export function createTrelloCardAction(card = {}) {
	return {
		type: START_CREATE_TRELLO_CARD,
		card,
	};
}

export function createTrelloCardSuccessAction(card = {}) {
	return {
		type: CREATE_TRELLO_CARD_SUCCESS,
		card,
	};
}

export function createTrelloCardFailedAction(error) {
	return {
		type: CREATE_TRELLO_CARD_FAILED,
		error,
	};
}

export function updateTrelloCardAction(card = {}) {
	return {
		type: START_UPDATE_TRELLO_CARD,
		card,
	};
}

export function updateTrelloCardSuccessAction(card = {}) {
	return {
		type: UPDATE_TRELLO_CARD_SUCCESS,
		card,
	};
}

export function updateTrelloCardFailedAction(error) {
	return {
		type: UPDATE_TRELLO_CARD_FAILED,
		error,
	};
}
