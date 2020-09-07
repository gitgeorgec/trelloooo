import React, { useState, useEffect } from 'react';
import PropType from 'prop-types';
import {
	Card,
	CardHeader,
	Typography,
	makeStyles,
	IconButton,
	Input,
} from '@material-ui/core';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import CardModal from '../card-modal';
import produce from 'immer';

const useStyle = makeStyles({
	card: {
		width: 256,
		minHeight: 60,
		padding: 5,
		position: 'relative',
	},
	cardTitle: {
		cursor: 'text',
	},
	button: {
		position: 'absolute',
		right: 5,
		top: 16,
	},
});

const propTypes = {
	data: PropType.shape({
		id: PropType.string,
		title: PropType.string,
		content: PropType.string,
	}),
	cardId: PropType.string,
	onUpdate: PropType.func,
	onDeleteCard: PropType.func,
};
const defaultProps = {
	onUpdate: () => {},
	onDeleteCard: () => {},
};

function TrelloCard({
	data = {},
	onUpdate,
	onDeleteCard,
	cardId,
}) {
	const { title: cardTitle, content: cardContent } = data;
	const classes = useStyle();
	const [title, setTitle] = useState(cardTitle);
	const [isTitleEditable, setIsTitleEditable] = useState(false);
	const [isContentModalVisible, setIsContentModalVisible] = useState(false);

	useEffect(() => {
		if (data && cardTitle !== title) {
			setTitle(cardTitle);
		}
	}, [cardTitle]);

	function _handleUpdateTitle() {
		const udpateData = produce(data, draftState => {
			draftState.title = title;
		});

		setIsTitleEditable(false);

		if (title !== cardTitle) {
			onUpdate(cardId, udpateData);
		}
	}

	function _handleUpdateContent(content) {
		const updateData = produce(data, draftState => {
			draftState.content = content;
		});

		if (cardContent !== content) {
			onUpdate(cardId, updateData);
		}
	}

	return (
		<>
			<Card
				title={title}
				onClick={() => setIsContentModalVisible(true)}
				variant="outlined"
				className={classes.card}
			>
				<CardHeader
					title={
						<Typography
							component="h6"
							variant="h6"
							className={classes.cardTitle}
							onClick={e => {
								e.stopPropagation();
								setIsTitleEditable(true);
							}}
						>
							{
								isTitleEditable ?
									<Input
										value={title}
										onChange={e => setTitle(e.target.value)}
										onBlur={_handleUpdateTitle}
										autoFocus
									/> :
									title
							}
						</Typography>
					}
					action={
						<IconButton
							onClick={onDeleteCard}
						>
							<HighlightOffRoundedIcon/>
						</IconButton>
					}
				/>
			</Card>
			<CardModal
				isVisible={isContentModalVisible}
				title={cardTitle}
				content={cardContent}
				onClose={() => setIsContentModalVisible(false)}
				onUpdateContent={_handleUpdateContent}
			/>
		</>
	);
}

TrelloCard.propTypes = propTypes;
TrelloCard.defaultProps = defaultProps;

export default TrelloCard;
