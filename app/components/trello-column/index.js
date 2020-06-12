import React, { useState } from 'react';
import PropType from 'prop-types';
import {
	Card,
	CardHeader,
	CardActions,
	Typography,
	Input,
	makeStyles,
	Button,
} from '@material-ui/core';

const useStyle = makeStyles({
	card: {
		width: 272,
		minHeight: 78,
		height: '100%',
		padding: 5,
		backgroundColor: '#ebecf0',
		marginRight: 10,
	},
	header: {
		padding: '5px 10px',
	},
});

const propTypes = {
	children: PropType.node,
	data: PropType.shape({
		id: PropType.string,
		title: PropType.string,
	}),
	updateTitle: PropType.func,
	onCreateCard: PropType.func,
};
const defaultProps = {
	updateTitle: () => {},
	onCreateCard: () => {},
};

function TrelloColumn({
	children,
	data,
	updateTitle,
	onCreateCard,
}) {
	const classes = useStyle();
	const [title, setTitle] = useState(data.title);
	const [isTitleEditable, setIsTitleEditable] = useState(false);

	function _handleUpdateTitle() {
		setIsTitleEditable(false);
		updateTitle(title);
	}

	return (
		<Card
			variant="outlined"
			className={classes.card}
		>
			<CardHeader
				className={classes.header}
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
			/>
			{children}
			<CardActions>
				<Button
					fullWidth
					onClick={() => onCreateCard(data.id)}
					color="primary"
				>
					Create New Card
				</Button>
			</CardActions>
		</Card>
	);
}

TrelloColumn.propTypes = propTypes;
TrelloColumn.defaultProps = defaultProps;

export default TrelloColumn;
