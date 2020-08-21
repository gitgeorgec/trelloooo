import { actionTypes } from '../actions';
import { LoadingStatusEnum } from '../../../lib/enums';
import produce from 'immer';

const { NONE, LOADING, SUCCESS, FAILED } = LoadingStatusEnum;
const {
	START_CREATE_TRELLO_CARD,
	CREATE_TRELLO_CARD_SUCCESS,
	CREATE_TRELLO_CARD_FAILED,
	START_UPDATE_TRELLO_CARD,
	UPDATE_TRELLO_CARD_SUCCESS,
	UPDATE_TRELLO_CARD_FAILED,
} = actionTypes;

const initState = {
	data: {
		'card-1': {
			id: 'card-1',
			title: 'Card-Title1',
			content: 'some content',
		},
		'card-2': {
			id: 'card-2',
			title: 'Card-Title2',
			content: 'some content',
		},
		'card-3': {
			id: 'card-3',
			title: 'Card-Title3',
			content: 'some content',
		},
	},

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
			const { card } = action;

			draftState.data[card.id] = card;
			draftState.createLoadingStatus = SUCCESS;

			return draftState;
		}

		case CREATE_TRELLO_CARD_FAILED: {
			draftState.createLoadingStatus = FAILED;
			draftState.error = action.error;

			return draftState;
		}

		case START_UPDATE_TRELLO_CARD: {
			draftState.updateLoadingStatus = LOADING;

			return draftState;
		}

		case UPDATE_TRELLO_CARD_SUCCESS: {
			const { card } = action;

			draftState.data[card.id] = card;
			draftState.updateLoadingStatus = SUCCESS;

			return draftState;
		}

		case UPDATE_TRELLO_CARD_FAILED: {
			draftState.updateLoadingStatus = FAILED;
			draftState.error = action.error;

			return draftState;
		}

		default:
			return draftState;
	}
});

export default trelloColumn;

