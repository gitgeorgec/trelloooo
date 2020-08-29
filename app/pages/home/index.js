import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RouteKeyEnums } from '../../routes';
import { useSelector, useDispatch } from 'react-redux';
import {
	makeStyles,
	Card,
	Typography,
	CardActionArea,
	IconButton,
} from '@material-ui/core';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import CreateDashboardModal from './create-dashboard-modal';
import { dashboardActions } from '../../repositories/redux/actions';

const { DASHBOARD } = RouteKeyEnums;
const {
	createDashboardAction,
	deleteDahsboardAction,
} = dashboardActions;

const useStyle = makeStyles({
	home: {
		display: 'flex',
		justifyContent: 'center',
		minHeight: 'calc(100vh - 64px)',
	},
	title: {
		color: '#fff',
		textAlign: 'center',
		margin: 20,
		textShadow: '2px 2px gray',
	},
	dashboards: {
		display: 'grid',
		gridTemplateColumns: '1fr 1fr 1fr 1fr',
	},
	card: {
		width: 240,
		height: 160,
		margin: 10,
		backgroundImage: 'radial-gradient(circle, #2e2ee3, #0063f7, #0087fa, #00a5f1, #61bfe6)',
		transition: '0.2s',
		'&:hover': {
			transform: 'scale(1.05)',
		},
		position: 'relative',
	},
	deleteBtn: {
		position: 'absolute',
		top: 0,
		right: 0,
		color: '#fff',
	},
	action: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		color: '#fff',
		height: '100%',
		cursor: 'pointer',
		textAlign: 'center',
	},
	link: {
		color: 'white',
		textDecoration: 'none',
	},
});

function Home() {
	const [isCreateDashboardModalVisible, setIsCreateDashboardModalVisible] = useState(false);
	const classes = useStyle();
	const dashboardData = useSelector(state => state.dashboard.data);
	const dispatch = useDispatch();

	function _handleCreateDashborad({ name }) {
		dispatch(createDashboardAction(name));
		setIsCreateDashboardModalVisible(false);
	}

	function _handleDeleteDashboard(dashboard) {
		dispatch(deleteDahsboardAction(dashboard));
	}

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
				<IconButton
					className={classes.deleteBtn}
					onClick={e => {
						e.stopPropagation();
						_handleDeleteDashboard(id);
					}}
				>
					<HighlightOffRoundedIcon/>
				</IconButton>
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
					<Card
						className={classes.card}
						onClick={() => setIsCreateDashboardModalVisible(true)}
					>
						<CardActionArea className={classes.action}>
							<Typography variant="h5" component="h2">
								+ CREATE DASHBOARD
							</Typography>
						</CardActionArea>
					</Card>
				</div>
			</div>
			<CreateDashboardModal
				isVisible={isCreateDashboardModalVisible}
				onClose={() => setIsCreateDashboardModalVisible(false)}
				onCreate={_handleCreateDashborad}
			/>
		</div>
	);
}

export default Home;

