import React, { useEffect } from 'react';
import PropType from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import produce from 'immer';
import {
	Typography,
	makeStyles,
	Button,
} from '@material-ui/core';
import TrelloColumn from '../../components/trello-column';
import TrelloCard from '../../components/trello-card';
import {
	DragDropContext,
	Droppable,
	Draggable,
} from 'react-beautiful-dnd';
import {
	dashboardActions,
	trelloColumnActions,
	trelloCardActions,
} from '../../repositories/redux/actions';

const { updateDashboardAction } = dashboardActions;
const {
	createTrelloColumnAction,
	updateTrelloColumnsAction,
	deleteTrelloColumnAction,
	subscribeTrelloColumnsAction,
	unsubscribeTrelloColumnsAction,
} = trelloColumnActions;
const {
	createTrelloCardAction,
	updateTrelloCardsAction,
	deleteTrelloCardAction,
	subscriptTrelloCardsAction,
	unsubscriptTrelloCardsAction,
} = trelloCardActions;

const useStyle = makeStyles({
	dashboard: {
		padding: 10,
	},
	title: {
		color: '#fff',
	},
	content: {
		width: '100%',
		minHeight: '100%',
		display: 'flex',
		overflowY: 'scroll',
	},
	button: {
		width: 272,
		padding: 5,
		height: 78,
		whiteSpace: 'nowrap',
		flexShrink: 0,
		backgroundColor: '#fff',
	},
});

const propTypes = {
	dashboardId: PropType.string,
};

function TrelloDashboard({
	dashboardId,
}) {
	const classes = useStyle();
	const dashboardData = useSelector(state => state.dashboard).data;
	const columnData = useSelector(state => state.trelloColumn).data;
	const cardData = useSelector(state => state.trelloCard).data;
	const { columnIds = [], title } = dashboardData[dashboardId] ? dashboardData[dashboardId] : {};
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(subscribeTrelloColumnsAction(dashboardId));

		return () => dispatch(unsubscribeTrelloColumnsAction());
	}, [dashboardId]);

	useEffect(() => {
		dispatch(subscriptTrelloCardsAction(dashboardId));

		return () => dispatch(unsubscriptTrelloCardsAction());
	}, [dashboardId]);

	function _handleDragEnd(result) {
		const { destination, draggableId, source, type } = result;

		if (!destination) {
			return;
		}

		if (destination.droppableId === source.droppableId && destination.index === source.index) {
			return;
		}

		if (type === 'column') {
			dispatch(updateDashboardAction(dashboardId, produce(dashboardData[dashboardId], draftState => {
				draftState.columnIds[destination.index] = columnIds[source.index];
				draftState.columnIds[source.index] = columnIds[destination.index];
			})));
		}

		if (type === 'card') {
			let newColumnData;

			if (destination.droppableId === source.droppableId) {
				const column = columnData[destination.droppableId];

				newColumnData = produce(columnData, draftState => {
					draftState[destination.droppableId].cardIds[destination.index] = column.cardIds[source.index];
					draftState[destination.droppableId].cardIds[source.index] = column.cardIds[destination.index];
				});
			} else {
				newColumnData = produce(columnData, draftState => {
					draftState[destination.droppableId].cardIds.splice(destination.index, 0, draggableId);
					draftState[source.droppableId].cardIds.splice(source.index, 1);
				});
			}

			dispatch(updateTrelloColumnsAction([
				{
					columnId: source.droppableId,
					column: newColumnData[source.droppableId],
				}, {
					columnId: destination.droppableId,
					column: newColumnData[destination.droppableId],
				},
			]));
		}
	}

	function _handleCreateCard(columnId) {
		dispatch(createTrelloCardAction('New Card', columnId, dashboardId));
	}

	function _handleUpdateCard(cardId, card) {
		dispatch(updateTrelloCardsAction(
			[{
				cardId,
				card,
			}]
		));
	}

	function _handleDeleteCard(cardId, columnId) {
		dispatch(deleteTrelloCardAction(cardId, columnId));
	}

	function _handleCreateColumn() {
		dispatch(createTrelloColumnAction('New Column', dashboardId));
	}

	function _handleUpdateColumnTitle(columnId, title) {
		dispatch(updateTrelloColumnsAction(
			[{
				columnId,
				column: produce(columnData[columnId], draftState => {
					draftState.title = title;
				}),
			}]
		));
	}

	function _handleDeleteColumn(columnId) {
		dispatch(deleteTrelloColumnAction(columnId));
	}

	function _renderCards(cardIds, columnId) {
		return cardIds.map((cardId, index) => (
			<Draggable
				draggableId={cardId}
				key={cardId}
				index={index}
			>
				{provided => (
					<div
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						ref={provided.innerRef}
					>
						<TrelloCard
							data={cardData[cardId]}
							cardId={cardId}
							index={index}
							onUpdate={_handleUpdateCard}
							onDeleteCard={() => _handleDeleteCard(cardId, columnId)}
						/>
					</div>
				)}
			</Draggable>
		));
	}

	function _renderColumns() {
		return columnIds.map((columnId, index) => (
			<Draggable
				draggableId={columnId}
				key={columnId}
				index={index}
			>
				{provided => (
					<div
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						ref={provided.innerRef}
					>
						<Droppable
							droppableId={columnId}
							type="card"
						>
							{provided => (
								<div
									className={classes.content}
									ref={provided.innerRef}
									{...provided.droppableProps}
								>
									<TrelloColumn
										data={columnData[columnId]}
										columnId={columnId}
										onCreateCard={_handleCreateCard}
										onUpdateTitle={_handleUpdateColumnTitle}
										onDeleteColumn={_handleDeleteColumn}
									>
										{_renderCards(columnData[columnId] ? columnData[columnId].cardIds : [], columnId)}
										{provided.placeholder}
									</TrelloColumn>
								</div>
							)}
						</Droppable>
					</div>
				)}
			</Draggable>
		));
	}

	return (
		<div className={classes.dashboard}>
			<Typography
				component="h1"
				variant="h3"
				className={classes.title}
			>
				{title}
			</Typography>
			<DragDropContext
				onDragEnd={_handleDragEnd}
			>
				<Droppable
					droppableId="droppableId"
					direction="horizontal"
					type="column"
				>
					{provided => (
						<div
							className={classes.content}
							ref={provided.innerRef}
							{...provided.droppableProps}
						>
							{_renderColumns()}
							{provided.placeholder}
							<Button
								onClick={_handleCreateColumn}
								className={classes.button}
							>
								CREATE NEW COLUMN
							</Button>
						</div>
					)}
				</Droppable>
			</DragDropContext>
		</div>
	);
}

TrelloDashboard.propTypes = propTypes;

export default TrelloDashboard;
