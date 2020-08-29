import { firebase } from '../index';
import {
	actionTypes,
	trelloCardActions,
} from '../../repositories/redux/actions';

const {
	START_CREATE_TRELLO_CARD,
	START_UPDATE_TRELLO_CARDS,
	START_DELETE_TRELLO_CARD,
	SUBSCRIBE_TRELLO_CARDS,
	UNSUBSCRIBE_TRELLO_CARDS,
} = actionTypes;
const {
	createTrelloCardSuccessAction,
	createTrelloCardFailedAction,
	updateTrelloCardsSuccessAction,
	updateTrelloCardsFailedAction,
	deleteTrelloCardSuccessAction,
	deleteTrelloCardFailedAction,
	setTrelloCard,
} = trelloCardActions;

const { database } = firebase;
const columnRef = database.collection('column');
const cardRef = database.collection('card');

let unsubscribeTrelloCards = () => {};

const firebaseTrelloCardMiddleware = store => next => action => {
	const { dispatch, getState } = store;
	const trelloColumnData = getState().trelloColumn.data;

	switch (action.type) {
		case SUBSCRIBE_TRELLO_CARDS: {
			const { dashboardId } = action;

			unsubscribeTrelloCards = cardRef.where('dashboardId', '==', dashboardId)
				.onSnapshot(snapshot => {
					snapshot.docChanges().forEach(change => {
						const cardId = change.doc.ref.id;

						if (change.type === 'added' || change.type === 'modified') {
							dispatch(setTrelloCard(cardId, change.doc.data()));
						}

						if (change.type === 'removed') {
							dispatch(setTrelloCard(cardId));
						}
					});
				}, err => console.warn(err));

			break;
		}

		case UNSUBSCRIBE_TRELLO_CARDS: {
			unsubscribeTrelloCards();
			break;
		}

		case START_CREATE_TRELLO_CARD: {
			const { title, columnId, dashboardId } = action;

			cardRef.add({
				title,
				dashboardId,
				content: 'content',
			})
				.then(res => {
					columnRef.doc(columnId).update({ cardIds: [
						...trelloColumnData[columnId].cardIds,
						res.id,
					] });
					dispatch(createTrelloCardSuccessAction());
				})
				.catch(err => dispatch(createTrelloCardFailedAction(err)));
			break;
		}

		case START_UPDATE_TRELLO_CARDS: {
			const { cards } = action;
			const batch = database.batch();

			cards.forEach(({ cardId, card }) => {
				batch.update(cardRef.doc(cardId), card);
			});

			batch.commit()
				.then(() => dispatch(updateTrelloCardsSuccessAction()))
				.catch(() => dispatch(updateTrelloCardsFailedAction()));

			break;
		}

		case START_DELETE_TRELLO_CARD: {
			const { cardId, columnId } = action;
			const batch = database.batch();

			batch.delete(cardRef.doc(cardId));

			batch.update(columnRef.doc(columnId), {
				cardIds: trelloColumnData[columnId].cardIds.filter(id => id !== cardId),
			});

			batch.commit()
				.then(() => deleteTrelloCardSuccessAction())
				.catch(error => deleteTrelloCardFailedAction(error));

			break;
		}

		default:
			break;
	}

	return next(action);
};

export default firebaseTrelloCardMiddleware;
