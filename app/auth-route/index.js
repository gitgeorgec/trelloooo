import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
	Redirect,
	withRouter,
} from 'react-router-dom';
import { RouteKeyEnums } from '../routes';

const {
	LOGIN,
	SIGN_UP,
	FORGET_PASSWORD,
} = RouteKeyEnums;

const omitPaths = [
	LOGIN,
	SIGN_UP,
	FORGET_PASSWORD,
];

const propTypes = {
	location: PropTypes.shape({
		pathname: PropTypes.string.isRequired,
	}).isRequired,
	render: PropTypes.func.isRequired,
	checkAuthAction: PropTypes.func.isRequired,
};

export function AuthRoute({
	location,
	render,
}) {
	const [isAuthed, setIsAuthed] = useState(true);
	const [isAuthChecking, setIsAuttChecking] = useState(true);

	useEffect(() => {
		// TODO dispatch auth action
		setTimeout(() => setIsAuttChecking(false), 100);
	}, []);

	if (checkIsOmitPath(location.pathname)) {
		return render({ isAuthed: false });
	}

	if (isAuthChecking) {
		return <div>Auth Checking...</div>;
	}

	if (!isAuthed) {
		return (
			<Redirect
				to={{
					pathname: LOGIN,
					state: {
						from: location.pathname,
					},
				}}
			/>
		);
	}

	return render({ isAuthed });
}

AuthRoute.propTypes = propTypes;

function checkIsOmitPath(pathname = '') {
	const filteredOmitPaths = omitPaths
		.filter(omitPath => pathname.indexOf(omitPath) === 0);

	return filteredOmitPaths.length > 0;
}

export default withRouter(AuthRoute);
