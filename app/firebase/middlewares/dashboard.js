import { firebase } from '../index';
import {
	actionTypes,
	dashboardActions,
} from '../../repositories/redux/actions';
import { START_UPDATE_DASHBOARD } from '../../repositories/redux/actions/action-types';

const {
	START_CREATE_DASHBOARD,
	START_DELETE_DASHBOARD,
	SUBSCRIBE_DASHBOARD,
	UNSUBSCRIBE_DASHBOARD,
} = actionTypes;
const {
	createDashboardSuccessAction,
	createDashboardFailedAction,
	updateDashboardSuccessAction,
	updateDashboardFailedAction,
	deleteDashboardSuccessAction,
	deleteDashboardFailedAction,
	setDashboardAction,
} = dashboardActions;

const { database, auth } = firebase;
const dashboardRef = database.collection('dashboard');
const columnRef = database.collection('column');
const cardRef = database.collection('card');

let unsubscribeDashboard = () => {};

const firebaseDashboradMiddleware = store => next => action => {
	const { dispatch } = store;

	switch (action.type) {
		case SUBSCRIBE_DASHBOARD: {
			const { userId } = action;

			unsubscribeDashboard = dashboardRef.where('users', 'array-contains', userId)
				.onSnapshot(snapshot => {
					snapshot.docChanges().forEach(change => {
						const dashboardId = change.doc.ref.id;

						if (change.type === 'added' || change.type === 'modified') {
							dispatch(setDashboardAction(dashboardId, change.doc.data()));
						}

						if (change.type === 'removed') {
							dispatch(setDashboardAction(dashboardId));
						}
					});
				}, err => console.warn(err));

			break;
		}

		case UNSUBSCRIBE_DASHBOARD: {
			unsubscribeDashboard();

			break;
		}

		case START_CREATE_DASHBOARD: {
			const { title } = action;

			dashboardRef.add({
				title,
				users: [auth.currentUser.uid],
				columnIds: [],
			})
				.then(() => dispatch(updateDashboardSuccessAction()))
				.catch(err => dispatch(createDashboardFailedAction(err)));

			break;
		}

		case START_UPDATE_DASHBOARD: {
			const { dashboardId, dashboard } = action;

			dashboardRef.doc(dashboardId)
				.update(dashboard)
				.then(() => dispatch(createDashboardSuccessAction()))
				.catch(err => dispatch(updateDashboardFailedAction(err)));

			break;
		}

		case START_DELETE_DASHBOARD: {
			const { dashboardId } = action;
			const batch = database.batch();

			batch.delete(dashboardRef.doc(dashboardId));

			const columnRefPromise = columnRef.where('dashboardId', '==', dashboardId)
				.get()
				.then(querySnapshot => {
					querySnapshot.forEach(doc => {
						console.log('columnRefPromise', doc.id);
						batch.delete(columnRef.doc(doc.id));
					});
				});
			const cardRefPromise = cardRef.where('dashboardId', '==', dashboardId)
				.get()
				.then(querySnapshot => {
					querySnapshot.forEach(doc => {
						console.log('columnRefPromise', doc.id);
						batch.delete(cardRef.doc(doc.id));
					});
				});

			Promise.all([columnRefPromise, cardRefPromise])
				.then(() => batch.commit())
				.then(() => dispatch(deleteDashboardSuccessAction()))
				.catch(error => dispatch(deleteDashboardFailedAction(error)));

			break;
		}

		default:
			break;
	}

	return next(action);
};

export default firebaseDashboradMiddleware;
