import { combineReducers } from 'redux';
import auth from './auth';
import dashboard from './dashboard';
import trelloColumn from './trello-column';
import trelloCard from './trello-card';
import user from './user';

const reducer = combineReducers(
	{
		auth,
		dashboard,
		trelloColumn,
		trelloCard,
		user,
	}
);

export default reducer;
