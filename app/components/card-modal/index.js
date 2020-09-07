import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Title from './title';
import { makeStyles } from '@material-ui/core/styles';
import ReactMarkdown from 'react-markdown';

const useStyles = makeStyles({
	textArea: {
		width: '100%',
		overflow: 'hidden',
		overflowWrap: 'break-word',
		minHeight: 300,
	},
});
const propTypes = {
	isVisible: PropTypes.bool.isRequired,
	title: PropTypes.string,
	content: PropTypes.string,
	onClose: PropTypes.func,
	onUpdateContent: PropTypes.func,
};
const defaultProps = {
	onClose: () => {},
	onUpdateContent: () => {},
};

function CardModal({
	isVisible,
	title,
	content,
	onClose,
	onUpdateContent,
}) {
	const classes = useStyles();
	const [isTitleEditable, setIsTitleEditable] = useState(false);
	const [editContent, setEditContent] = useState('');

	useEffect(() => {
		if (editContent !== content) {
			setEditContent(content);
		}
	}, [content]);

	function _handleUpdateContent() {
		setIsTitleEditable(false);
		onUpdateContent(editContent);
	}

	return (
		<Dialog
			open={isVisible}
			onClose={onClose}
			fullWidth
			scroll="paper"
		>
			<Title onClose={onClose}>{title}</Title>
			<DialogContent dividers>
				{
					isTitleEditable ?
						<TextareaAutosize
							className={classes.textArea}
							value={editContent}
							onChange={e => setEditContent(e.target.value)}
							onBlur={_handleUpdateContent}
							autoFocus
						/> :
						<div onClick={() => setIsTitleEditable(true)}>
							<ReactMarkdown
								className={classes.textArea}
								source={editContent}
								escapeHtml
							/>
						</div>
				}
			</DialogContent>
		</Dialog>
	);
}

CardModal.propTypes = propTypes;
CardModal.defaultProps = defaultProps;

export default CardModal;
