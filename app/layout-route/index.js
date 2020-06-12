import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import { withRouter } from 'react-router-dom';
import routes from '../routes';
import { makeStyles, CssBaseline } from '@material-ui/core';
import Img from '../static/img/freeimg_92769330046freejpg850.jpg';

const useStyle = makeStyles({
	layout: {
		backgroundImage: `url(${Img})`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundAttachment: 'fixed',
		minHeight: '100vh',
	},
});

const propTypes = {
	location: PropTypes.shape({
		pathname: PropTypes.string.isRequired,
	}).isRequired,
	isAuthed: PropTypes.bool.isRequired,
};

function LayoutRoute({
	isAuthed,
}) {
	const classes = useStyle();

	function _renderPublicLayout() {
		return renderRoutes(routes);
	}

	function _renderPrivateLayout() {
		return renderRoutes(routes);
	}

	return (
		<div className={classes.layout}>
			<CssBaseline/>
			<Suspense
				fallback={<div>loading</div>}
			>
				{isAuthed ? _renderPrivateLayout() : _renderPublicLayout()}
			</Suspense>
		</div>
	);
}

LayoutRoute.propTypes = propTypes;

export default withRouter(LayoutRoute);
