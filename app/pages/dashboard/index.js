import React from 'react';
import PropTypes from 'prop-types';
import TrelloDashboard from '../../feature/trello-dashboard';
import { withRouter } from 'react-router';

const propTypes = {
	match: PropTypes.object,
};

function Dashboard({ match }) {
	const { dashboardId } = match.params;

	return (
		<TrelloDashboard
			title="Dashboard"
			dashboardId={dashboardId}
		/>
	);
}

Dashboard.propTypes = propTypes;

export default withRouter(Dashboard);

