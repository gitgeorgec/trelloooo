import { combineReducers } from 'redux';
import dashboard from './dashboard';
import trelloColumn from './trello-column';
import trelloCard from './trello-card';

const reducer = combineReducers(
	{
		dashboard,
		trelloColumn,
		trelloCard,
	}
);

export default reducer;
