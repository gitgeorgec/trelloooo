import { combineReducers } from 'redux';
import auth from './auth';
import dashboard from './dashboard';
import trelloColumn from './trello-column';
import trelloCard from './trello-card';

const reducer = combineReducers(
	{
		auth,
		dashboard,
		trelloColumn,
		trelloCard,
	}
);

export default reducer;
