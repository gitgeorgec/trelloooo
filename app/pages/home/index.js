import React from 'react';
import { Link } from 'react-router-dom';
import { RouteKeyEnums } from '../../routes';
import { useSelector } from 'react-redux';
import {
	makeStyles,
	Card,
	Typography,
	CardActionArea,
} from '@material-ui/core';

const { DASHBOARD } = RouteKeyEnums;

const useStyle = makeStyles({
	home: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		minHeight: '100vh',
	},
	title: {
		color: '#fff',
		textAlign: 'center',
		margin: 20,
		textShadow: '2px 2px gray',
	},
	dashboards: {
		display: 'grid',
		gridTemplateColumns: '1fr 1fr 1fr',
	},
	card: {
		width: 300,
		height: 200,
		margin: 10,
		backgroundImage: 'radial-gradient(circle, #2e2ee3, #0063f7, #0087fa, #00a5f1, #61bfe6)',
		transition: '0.5s',
		'&:hover': {
			transform: 'scale(1.05)',
		},
	},
	action: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		color: '#fff',
		height: '100%',
		cursor: 'pointer',
	},
	link: {
		color: 'white',
		textDecoration: 'none',
	},
});

function Home() {
	const classes = useStyle();
	const dashboardData = useSelector(state => state.dashboard.data);

	function _renderDashBoards() {
		const dashboardIds = Object.keys(dashboardData);

		return dashboardIds.map(id => (
			<Card key={id} className={classes.card}>
				<Link to={`${DASHBOARD}/${id}`} className={classes.link}>
					<CardActionArea className={classes.action}>
						<Typography variant="h4" component="h2">
							{dashboardData[id].title}
						</Typography>
					</CardActionArea>
				</Link>
			</Card>
		));
	}

	return (
		<div className={classes.home}>
			<div>
				<Typography
					variant="h3"
					component="h1"
					className={classes.title}
				>
					MY DASHBOARDS
				</Typography>
				<div className={classes.dashboards}>
					{_renderDashBoards()}
					<Card className={classes.card}>
						<CardActionArea className={classes.action}>
							<Typography variant="h5" component="h2">
								+ CREATE DASHBOARD
							</Typography>
						</CardActionArea>
					</Card>
				</div>
			</div>
		</div>
	);
}

export default Home;

