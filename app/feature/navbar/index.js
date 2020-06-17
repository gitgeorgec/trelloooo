import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../../repositories/redux/actions/auth-actions';

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

function NavBar() {
	const classes = useStyles();
	const dispatch = useDispatch();

	function _handleLogout() {
		dispatch(logoutAction());
	}

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					{/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
						<MenuIcon/>
					</IconButton> */}
					<Typography variant="h6" className={classes.title}>
						News
					</Typography>
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
