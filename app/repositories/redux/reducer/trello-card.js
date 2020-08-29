import { actionTypes } from '../actions';
import { LoadingStatusEnum } from '../../../lib/enums';
import produce from 'immer';

const { NONE, LOADING, SUCCESS, FAILED } = LoadingStatusEnum;
const {
	START_CREATE_TRELLO_CARD,
	CREATE_TRELLO_CARD_SUCCESS,
	CREATE_TRELLO_CARD_FAILED,
	START_UPDATE_TRELLO_CARDS,
	UPDATE_TRELLO_CARDS_SUCCESS,
	UPDATE_TRELLO_CARDS_FAILED,
	SET_TRELLO_CARD,
} = actionTypes;

// Example
// data: {
// 	'cardId': {
// 		columnId: 'columnId',
// 		title: 'cardTitle',
// 		content: 'content',
// 	},
const initState = {
	data: {},

	updateLoadingStatus: NONE,
	createLoadingStatus: NONE,
	error: {},
};

const trelloColumn = produce((draftState = initState, action) => {
	switch (action.type) {
		case START_CREATE_TRELLO_CARD: {
			draftState.createLoadingStatus = LOADING;

			return draftState;
		}

		case CREATE_TRELLO_CARD_SUCCESS: {
			draftState.createLoadingStatus = SUCCESS;

			return draftState;
		}

		case CREATE_TRELLO_CARD_FAILED: {
			draftState.createLoadingStatus = FAILED;
			draftState.error = action.error;

			return draftState;
		}

		case START_UPDATE_TRELLO_CARDS: {
			draftState.updateLoadingStatus = LOADING;

			return draftState;
		}

		case UPDATE_TRELLO_CARDS_SUCCESS: {
			draftState.updateLoadingStatus = SUCCESS;

			return draftState;
		}

		case UPDATE_TRELLO_CARDS_FAILED: {
			draftState.updateLoadingStatus = FAILED;
			draftState.error = action.error;

			return draftState;
		}

		case SET_TRELLO_CARD: {
			const { cardId, card } = action;

			if (card) {
				draftState.data[cardId] = card;
			} else {
				delete draftState.data[cardId];
			}

			return draftState;
		}

		default:
			return draftState;
	}
});

export default trelloColumn;

