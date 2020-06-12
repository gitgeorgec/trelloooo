import React from 'react';
import PropTypes from 'prop-types';
import TrelloDashboard from '../../feature/trello-dashboard';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { RouteKeyEnums } from '../../routes';

const { HOME } = RouteKeyEnums;

const propTypes = {
	match: PropTypes.object,
};

function Dashboard({ match }) {
	const { dashboardId } = match.params;

	return (
		<div>
			<Link to={HOME}>Back Home</Link>
			<TrelloDashboard
				title="Dashboard"
				dashboardId={dashboardId}
			/>
		</div>
	);
}

Dashboard.propTypes = propTypes;

export default withRouter(Dashboard);

