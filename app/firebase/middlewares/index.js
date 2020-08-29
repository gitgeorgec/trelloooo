import firebaseAuthMiddleware from './auth';
import firebaseDashboradMiddleware from './dashboard';
import firebaseTrelloColumnMiddleware from './trello-column';
import firebaseTrelloCardMiddleware from './trell-card';

export default [
	firebaseAuthMiddleware,
	firebaseDashboradMiddleware,
	firebaseTrelloColumnMiddleware,
	firebaseTrelloCardMiddleware,
];
