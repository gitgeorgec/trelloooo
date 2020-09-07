import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../../repositories/redux/actions/auth-actions';
import { Link } from 'react-router-dom';
import { RouteKeyEnums } from '../../routes';

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		color: '#fff',
	},
	title: {
		flexGrow: 1,
	},
	titleLink: {
		color: 'white',
		textDecoration: 'none',
		fontWeight: 'bold',
	},
});

const propTypes = {
	isAuthed: PropTypes.bool,
	onNavigate: PropTypes.func,
};

function NavBar({
	isAuthed,
	onNavigate,
}) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const userData = useSelector(state => state.user);
	const [anchorEl, setAnchorEl] = useState(null);

	function _handleOpenMenu(event) {
		setAnchorEl(event.currentTarget);
	}

	function handleCloseMenu() {
		setAnchorEl(null);
	}

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
						<>
							<Avatar>{userData.username}</Avatar>
							<IconButton className={classes.menuButton}>
								<MenuIcon onClick={_handleOpenMenu}/>
							</IconButton>
							<Menu
								anchorEl={anchorEl}
								keepMounted
								open={Boolean(anchorEl)}
								onClose={handleCloseMenu}
								onClick={handleCloseMenu}
							>
								<MenuItem onClick={() => onNavigate(RouteKeyEnums.PROFILE)}>Profile</MenuItem>
								<MenuItem onClick={_handleLogout}>Logout</MenuItem>
							</Menu>
						</>
					)}
				</Toolbar>
			</AppBar>
		</div>
	);
}

NavBar.propTypes = propTypes;

export default NavBar;
