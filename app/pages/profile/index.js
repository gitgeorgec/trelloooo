import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyle = makeStyles({
	layout: {
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'column',
		alignItems: 'center',
		color: '#fff',
	},
});

function ProfilePage() {
	const classes = useStyle();
	const userData = useSelector(state => state.user);
	const { username, email } = userData;

	return (
		<div className={classes.layout}>
			<h1>Profile</h1>
			<Avatar>{username}</Avatar>
			<span>Email: {email}</span>
		</div>
	);
}

export default ProfilePage;
