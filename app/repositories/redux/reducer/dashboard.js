import { actionTypes } from '../actions';
import { LoadingStatusEnum } from '../../../lib/enums';
import produce from 'immer';

const { NONE, LOADING, SUCCESS, FAILED } = LoadingStatusEnum;
const {
	START_CREATE_DASHBOARD,
	CREATE_DASHBOARD_SUCCESS,
	CREATE_DASHBOARD_FAILED,
	START_UPDATE_DASHBOARD,
	UPDATE_DASHBOARD_SUCCESS,
	UPDATE_DASHBOARD_FAILED,
} = actionTypes;

const initState = {
	data: {
		'dashboard-1': {
			id: 'dashboard-1',
			title: 'dashboard-1',
			columnIds: ['column-1', 'column-2', 'column-3'],
		},
		'dashboard-2': {
			id: 'dashboard-2',
			title: 'dashboard-2',
			columnIds: ['column-4', 'column-5'],
		},
	},

	loadingStatus: NONE,
	createLoadingStatus: NONE,
	error: {},
};

const dashboardReducer = produce((draftState = initState, action) => {
	switch (action.type) {
		case START_CREATE_DASHBOARD: {
			draftState.createLoadingStatus = LOADING;

			return draftState;
		}

		case CREATE_DASHBOARD_SUCCESS: {
			const { dashboard } = action;

			draftState.data[dashboard.id] = dashboard;
			draftState.createLoadingStatus = SUCCESS;

			return draftState;
		}

		case CREATE_DASHBOARD_FAILED: {
			draftState.createLoadingStatus = FAILED;
			draftState.error = action.error;

			return draftState;
		}

		case START_UPDATE_DASHBOARD: {
			draftState.loadingStatus = LOADING;

			return draftState;
		}

		case UPDATE_DASHBOARD_SUCCESS: {
			const { dashboard } = action;

			draftState.loadingStatus = SUCCESS;
			draftState.data[dashboard.id] = dashboard;

			return draftState;
		}

		case UPDATE_DASHBOARD_FAILED: {
			draftState.loadingStatus = FAILED;
			draftState.error = action.error;

			return draftState;
		}

		default:
			return draftState;
	}
});

export default dashboardReducer;
