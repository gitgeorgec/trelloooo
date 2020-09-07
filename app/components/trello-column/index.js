import React, { useState, useEffect } from 'react';
import PropType from 'prop-types';
import {
	Card,
	CardHeader,
	CardActions,
	Typography,
	Input,
	makeStyles,
	Button,
	IconButton,
} from '@material-ui/core';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';

const useStyle = makeStyles({
	column: {
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
	columnId: PropType.string,
	onUpdateTitle: PropType.func,
	onCreateCard: PropType.func,
	onDeleteColumn: PropType.func,
};
const defaultProps = {
	onUpdateTitle: () => {},
	onCreateCard: () => {},
	onDeleteColumn: () => {},
	data: {},
};

function TrelloColumn({
	children,
	data,
	columnId,
	onUpdateTitle,
	onCreateCard,
	onDeleteColumn,
}) {
	const classes = useStyle();
	const [title, setTitle] = useState('');
	const [isTitleEditable, setIsTitleEditable] = useState(false);

	useEffect(() => {
		if (data && data.title !== title) {
			setTitle(data.title);
		}
	}, [data.title]);

	function _handleUpdateTitle() {
		setIsTitleEditable(false);

		if (title !== data.title) {
			onUpdateTitle(columnId, title);
		}
	}

	return (
		<Card
			variant="outlined"
			className={classes.column}
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
								data.title
						}
					</Typography>
				}
				action={(
					<IconButton
						onClick={() => onDeleteColumn(columnId)}
					>
						<HighlightOffRoundedIcon/>
					</IconButton>
				)}
			/>
			{children}
			<CardActions>
				<Button
					fullWidth
					onClick={() => onCreateCard(columnId)}
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
