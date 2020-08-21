import { SET_USER } from './action-types';

export function setUserAction(user) {
	return {
		type: SET_USER,
		user,
	};
}
