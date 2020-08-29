import { firebase } from '../index';
import {
	actionTypes,
	trelloColumnActions,
} from '../../repositories/redux/actions';

const {
	START_CREATE_TRELLO_COLUMN,
	START_UPDATE_TRELLO_COLUMNS,
	START_DELETE_TRELLO_COLUMN,
	SUBSCRIBE_TRELLO_COLUMNS,
	UNSUBSCRIBE_TRELLO_COLUMNS,
} = actionTypes;
const {
	createTrelloColumnSuccessAction,
	createTrelloColumnFailedAction,
	updateTrelloColumnsSuccessAction,
	updateTrelloColumnsFailedAction,
	deleteTrelloColumnSuccessAction,
	deleteTrelloColumnFailedAction,
	setTrelloColumnAction,
} = trelloColumnActions;

const { database } = firebase;
const dashboardRef = database.collection('dashboard');
const columnRef = database.collection('column');
const cardRef = database.collection('card');

let unsubscribeTrelloColumns = () => {};

const firebaseTrelloColumnMiddleware = store => next => action => {
	const { dispatch, getState } = store;
	const { dashboard, trelloColumn } = getState();
	const dashboardData = dashboard.data;
	const trelloColumnData = trelloColumn.data;

	switch (action.type) {
		case SUBSCRIBE_TRELLO_COLUMNS: {
			const { dashboardId } = action;

			unsubscribeTrelloColumns = columnRef.where('dashboardId', '==', dashboardId)
				.onSnapshot(snapshot => {
					snapshot.docChanges().forEach(change => {
						const columnId = change.doc.ref.id;

						if (change.type === 'added' || change.type === 'modified') {
							dispatch(setTrelloColumnAction(columnId, change.doc.data()));
						}

						if (change.type === 'removed') {
							dispatch(setTrelloColumnAction(columnId));
						}
					});
				}, err => console.warn(err));
			break;
		}

		case UNSUBSCRIBE_TRELLO_COLUMNS: {
			unsubscribeTrelloColumns();
			break;
		}

		case START_CREATE_TRELLO_COLUMN: {
			const { columnName, dashboardId } = action;

			columnRef.add({
				title: columnName,
				dashboardId,
				cardIds: [],
			})
				.then(res => {
					dashboardRef.doc(dashboardId).update({ columnIds: [
						...dashboardData[dashboardId].columnIds,
						res.id,
					] });
					dispatch(createTrelloColumnSuccessAction());
				})
				.catch(err => dispatch(createTrelloColumnFailedAction(err)));
			break;
		}

		case START_UPDATE_TRELLO_COLUMNS: {
			const { columns } = action;
			const batch = database.batch();

			columns.forEach(({ columnId, column }) => {
				batch.update(columnRef.doc(columnId), column);
			});

			batch.commit()
				.then(() => {
					dispatch(updateTrelloColumnsSuccessAction());
				})
				.catch(error => dispatch(updateTrelloColumnsFailedAction(error)));

			break;
		}

		case START_DELETE_TRELLO_COLUMN: {
			const { columnId } = action;
			const batch = database.batch();
			const { cardIds, dashboardId } = trelloColumnData[columnId];
			const { columnIds } = dashboardData[dashboardId];

			batch.delete(columnRef.doc(columnId));
			batch.update(dashboardRef.doc(dashboardId), { columnIds: columnIds.filter(id => id !== columnId) });

			cardIds.forEach(cardId => {
				batch.delete(cardRef.doc(cardId));
			});

			batch.commit()
				.then(() => deleteTrelloColumnSuccessAction())
				.catch(error => deleteTrelloColumnFailedAction(error));

			break;
		}

		default:
			break;
	}

	return next(action);
};

export default firebaseTrelloColumnMiddleware;
