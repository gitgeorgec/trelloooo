import {
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
	SUBSCRIBE_DASHBOARD,
	UNSUBSCRIBE_DASHBOARD,
} from './action-types';

export function fetchDashboardsAction(userId) {
	return {
		type: START_FETCH_DASHBOARDS,
		userId,
	};
}

export function fetchDashboardsSuccessAction(dashboards) {
	return {
		type: FETCH_DASHBOARDS_SUCCESS,
		dashboards,
	};
}

export function fetchDashboardsFailedAction(error) {
	return {
		type: FETCH_DASHBOARDS_FAILED,
		error,
	};
}

export function createDashboardAction(title) {
	return {
		type: START_CREATE_DASHBOARD,
		title,
	};
}

export function createDashboardSuccessAction() {
	return {
		type: CREATE_DASHBOARD_SUCCESS,
	};
}

export function createDashboardFailedAction(error) {
	return {
		type: CREATE_DASHBOARD_FAILED,
		error,
	};
}

export function updateDashboardAction(dashboardId, dashboard = {}) {
	return {
		type: START_UPDATE_DASHBOARD,
		dashboardId,
		dashboard,
	};
}

export function updateDashboardSuccessAction() {
	return {
		type: UPDATE_DASHBOARD_SUCCESS,
	};
}

export function updateDashboardFailedAction(error) {
	return {
		type: UPDATE_DASHBOARD_FAILED,
		error,
	};
}

export function deleteDahsboardAction(dashboardId) {
	return {
		type: START_DELETE_DASHBOARD,
		dashboardId,
	};
}

export function deleteDashboardSuccessAction() {
	return {
		type: DELETE_DASHBOARD_SUCCESS,
	};
}

export function deleteDashboardFailedAction(error) {
	return {
		type: DELETE_DASHBOARD_FAILED,
		error,
	};
}

export function setDashboardAction(dashboardId, dashboard) {
	return {
		type: SET_DASHBOARD,
		dashboardId,
		dashboard,
	};
}

export function subscribeDashboardAction(userId) {
	return {
		type: SUBSCRIBE_DASHBOARD,
		userId,
	};
}

export function unsubscribeDashboardAction() {
	return {
		type: UNSUBSCRIBE_DASHBOARD,
	};
}
