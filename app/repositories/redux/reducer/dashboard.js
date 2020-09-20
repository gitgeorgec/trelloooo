import { actionTypes } from '../actions';
import { LoadingStatusEnum } from '../../../lib/enums';
import produce from 'immer';

const { NONE, LOADING, SUCCESS, FAILED } = LoadingStatusEnum;
const {
	START_FETCH_DASHBOARDS,
	FETCH_DASHBOARDS_SUCCESS,
	FETCH_DASHBOARDS_FAILED,
	START_CREATE_DASHBOARD,
	CREATE_DASHBOARD_SUCCESS,
	CREATE_DASHBOARD_FAILED,
	START_UPDATE_DASHBOARD,
	UPDATE_DASHBOARD_SUCCESS,
	UPDATE_DASHBOARD_FAILED,
	START_DELETE_DASHBOARD,
	DELETE_DASHBOARD_SUCCESS,
	DELETE_DASHBOARD_FAILED,
	SET_DASHBOARD,
	LOGOUT_SUCCESS,
} = actionTypes;

// Example
// data: {
// 	'dashboardId': {
// 		title: 'dashboard-1',
// 		users: ['userId']
// 	}
// }

const initState = {
	data: {},

	loadingStatus: NONE,
	fetchLoadingStatus: NONE,
	createLoadingStatus: NONE,
	deleteLoadingStatus: NONE,
	error: {},
};

const dashboardReducer = produce((draftState = initState, action) => {
	switch (action.type) {
		case START_FETCH_DASHBOARDS: {
			draftState.fetchLoadingStatus = LOADING;

			return draftState;
		}

		case FETCH_DASHBOARDS_SUCCESS: {
			draftState.fetchLoadingStatus = SUCCESS;
			draftState.data = action.dashboards;

			return draftState;
		}

		case FETCH_DASHBOARDS_FAILED: {
			draftState.fetchLoadingStatus = FAILED;

			return draftState;
		}

		case START_CREATE_DASHBOARD: {
			draftState.createLoadingStatus = LOADING;

			return draftState;
		}

		case CREATE_DASHBOARD_SUCCESS: {
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
			draftState.loadingStatus = SUCCESS;

			return draftState;
		}

		case UPDATE_DASHBOARD_FAILED: {
			draftState.loadingStatus = FAILED;
			draftState.error = action.error;

			return draftState;
		}

		case START_DELETE_DASHBOARD: {
			draftState.deleteLoadingStatus = LOADING;

			return draftState;
		}

		case DELETE_DASHBOARD_SUCCESS: {
			draftState.deleteLoadingStatus = SUCCESS;

			return draftState;
		}

		case DELETE_DASHBOARD_FAILED: {
			draftState.deleteLoadingStatus = FAILED;
			draftState.error = action.error;

			return draftState;
		}

		case SET_DASHBOARD: {
			const { dashboard, dashboardId } = action;

			if (dashboard) {
				draftState.data[dashboardId] = dashboard;
			} else {
				delete draftState.data[dashboardId];
			}

			return draftState;
		}

		case LOGOUT_SUCCESS: {
			draftState.data = {};

			return draftState;
		}

		default:
			return draftState;
	}
});

export default dashboardReducer;
