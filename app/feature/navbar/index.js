import React from 'react';
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
}));

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
						<Link to="/">
							Trellooooo
						</Link>
					</Typography>
					<Button
						color="inherit"
						onClick={_handleLogout}
					>
						Setting
					</Button>
					<Button
						color="inherit"
						onClick={_handleLogout}
					>
						Logout
					</Button>
				</Toolbar>
			</AppBar>
		</div>
	);
}

export default NavBar;
