import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../../repositories/redux/actions/auth-actions';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
	titleLink: {
		color: 'white',
		textDecoration: 'none',
		fontWeight: 'bold',
	},
}));

const propTypes = {
	isAuthed: PropTypes.bool,
};

function NavBar({ isAuthed }) {
	const classes = useStyles();
	const dispatch = useDispatch();

	function _handleLogout() {
		dispatch(logoutAction());
	}

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" className={classes.title}>
						<Link to="/" className={classes.titleLink}>
							Trellooooo
						</Link>
					</Typography>
					{isAuthed && (
						<Button
							color="inherit"
							// onClick={_handleLogout}
						>
							Setting
						</Button>
					)}
					{isAuthed && (
						<Button
							color="inherit"
							onClick={_handleLogout}
						>
							Logout
						</Button>
					)}
				</Toolbar>
			</AppBar>
		</div>
	);
}

NavBar.propTypes = propTypes;

export default NavBar;
