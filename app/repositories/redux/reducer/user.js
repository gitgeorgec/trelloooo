import { actionTypes } from '../actions';
import produce from 'immer';

const {
	SET_USER,
} = actionTypes;

const initState = {
	user: {
		username: '',
		email: '',
		dashboardIds: [],
	},
};

const User = produce((draftState = initState, action) => {
	switch (action.type) {
		case SET_USER: {
			const { user } = action;

			draftState = user;

			return draftState;
		}

		default:
			return draftState;
	}
});

export default User;

