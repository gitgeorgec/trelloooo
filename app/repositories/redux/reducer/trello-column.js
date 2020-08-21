import { actionTypes } from '../actions';
import { LoadingStatusEnum } from '../../../lib/enums';
import produce from 'immer';

const { NONE, LOADING, SUCCESS, FAILED } = LoadingStatusEnum;
const {
	START_UPDATE_TRELLO_COLUMNS,
	UPDATE_TRELLO_COLUMNS_SUCCESS,
	UPDATE_TRELLO_COLUMNS_FAILED,
} = actionTypes;

const initState = {
	data: {
		'column-1': {
			id: 'column-1',
			title: 'Column 1',
			cardIds: ['card-1', 'card-2'],
		},
		'column-2': {
			id: 'column-2',
			title: 'Column 2',
			cardIds: ['card-3'],
		},
		'column-3': {
			id: 'column-3',
			title: 'Column 3',
			cardIds: [],
		},
		'column-4': {
			id: 'column-4',
			title: 'Column 4',
			cardIds: [],
		},
		'column-5': {
			id: 'column-5',
			title: 'Column 5',
			cardIds: [],
		},
	},

	loadingStatus: NONE,
	error: {},
};

const trelloColumn = produce((draftState = initState, action) => {
	switch (action.type) {
		case START_UPDATE_TRELLO_COLUMNS: {
			draftState.loadingStatus = LOADING;

			return draftState;
		}

		case UPDATE_TRELLO_COLUMNS_SUCCESS: {
			const { columns } = action;

			columns.forEach(column => {
				draftState.data[column.id] = column;
			});
			draftState.loadingStatus = SUCCESS;

			return draftState;
		}

		case UPDATE_TRELLO_COLUMNS_FAILED: {
			draftState.loadingStatus = FAILED;
			draftState.error = action.error;

			return draftState;
		}

		default:
			return draftState;
	}
});

export default trelloColumn;

