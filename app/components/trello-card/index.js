import React, { useState } from 'react';
import PropType from 'prop-types';
import {
	Card,
	CardHeader,
	Typography,
	makeStyles,
	Button,
	Input,
} from '@material-ui/core';
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
	onClick: PropType.func,
	onUpdate: PropType.func,
};
const defaultProps = {
	onClick: () => {},
	onUpdate: () => {},
};

function TrelloCard({
	data,
	onClick,
	onUpdate,
}) {
	const classes = useStyle();
	const [title, setTitle] = useState(data.title);
	const [isTitleEditable, setIsTitleEditable] = useState(false);

	function _handleUpdateTitle() {
		const udpateData = produce(data, draftState => {
			draftState.title = title;
		});

		setIsTitleEditable(false);
		onUpdate(udpateData);
	}

	function _handleClickEdit(e) {
		e.stopPropagation();
		setIsTitleEditable(true);
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
					<Typography component="h6" variant="h6">
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
					<Button
						color="primary"
						className={classes.button}
						onClick={_handleClickEdit}
					>
						Edit
					</Button>
				}
			/>
		</Card>
	);
}

TrelloCard.propTypes = propTypes;
TrelloCard.defaultProps = defaultProps;

export default TrelloCard;
