import {
	START_CREATE_DASHBOARD,
	CREATE_DASHBOARD_SUCCESS,
	CREATE_DASHBOARD_FAILED,
	START_UPDATE_DASHBOARD,
	UPDATE_DASHBOARD_SUCCESS,
	UPDATE_DASHBOARD_FAILED,
} from './action-types';

export function createDashboardAction(title) {
	return {
		type: START_CREATE_DASHBOARD,
		title,
	};
}

export function createDashboardSuccessAction(dashboard) {
	return {
		type: CREATE_DASHBOARD_SUCCESS,
		dashboard,
	};
}

export function createDashboardFailedAction(error) {
	return {
		type: CREATE_DASHBOARD_FAILED,
		error,
	};
}

export function updateDashboardAction(dashboard = {}) {
	return {
		type: START_UPDATE_DASHBOARD,
		dashboard,
	};
}

export function updateDashboardSuccessAction(dashboard = {}) {
	return {
		type: UPDATE_DASHBOARD_SUCCESS,
		dashboard,
	};
}

export function updateDashboardFailedAction(error) {
	return {
		type: UPDATE_DASHBOARD_FAILED,
		error,
	};
}
