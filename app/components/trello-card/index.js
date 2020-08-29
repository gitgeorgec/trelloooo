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
import produce from 'immer';

const useStyle = makeStyles({
	card: {
		width: 256,
		minHeight: 60,
		padding: 5,
		position: 'relative',
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
	}),
	cardId: PropType.string,
	onClick: PropType.func,
	onUpdate: PropType.func,
};
const defaultProps = {
	onClick: () => {},
	onUpdate: () => {},
};

function TrelloCard({
	data = {},
	onClick,
	onUpdate,
	onDeleteCard,
	cardId,
}) {
	const classes = useStyle();
	const [title, setTitle] = useState(data.title);
	const [isTitleEditable, setIsTitleEditable] = useState(false);

	useEffect(() => {
		if (data && data.title !== title) {
			setTitle(data.title);
		}
	}, [data.title]);

	function _handleUpdateTitle() {
		const udpateData = produce(data, draftState => {
			draftState.title = title;
		});

		setIsTitleEditable(false);

		if (title !== data.title) {
			onUpdate(cardId, udpateData);
		}
	}

	return (
		<Card
			title={title}
			onClick={() => onClick(data)}
			variant="outlined"
			className={classes.card}
		>
			<CardHeader
				title={
					<Typography
						component="h6"
						variant="h6"
						onClick={() => setIsTitleEditable(true)}
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
	);
}

TrelloCard.propTypes = propTypes;
TrelloCard.defaultProps = defaultProps;

export default TrelloCard;
