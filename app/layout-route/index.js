import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import { withRouter } from 'react-router-dom';
import routes from '../routes';
import { makeStyles, CssBaseline } from '@material-ui/core';
import Img from '../static/img/freeimg_92769330046freejpg850.jpg';
import NavBar from '../feature/navbar';
import { useSelector } from 'react-redux';

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
	history: PropTypes.object,
};

function LayoutRoute({
	history,
}) {
	const classes = useStyle();
	const authData = useSelector(state => state.auth);
	const { isAuthed } = authData;

	function onNavigate(uri, options = { passProps: {} }) {
		history.push({
			pathname: uri,
			passProps: options.passProps,
		});
	}

	function onBack() {
		history.goBack();
	}

	function _renderPublicLayout() {
		return renderRoutes(routes, {
			onNavigate,
			onBack,
		});
	}

	function _renderPrivateLayout() {
		return renderRoutes(routes, {
			onNavigate,
			onBack,
		});
	}

	return (
		<div className={classes.layout}>
			<CssBaseline/>
			<NavBar isAuthed={isAuthed} onNavigate={onNavigate}/>
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
