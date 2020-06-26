import React from 'react';
import PropTypes from 'prop-types';
import {
	Redirect,
	withRouter,
} from 'react-router-dom';
import { RouteKeyEnums } from '../routes';
import { useSelector } from 'react-redux';
import { LoadingStatusEnum } from '../lib/enums';

const {
	LOGIN,
	SIGN_UP,
	FORGET_PASSWORD,
} = RouteKeyEnums;
const { NONE, LOADING } = LoadingStatusEnum;
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
};

export function AuthRoute({
	location,
	render,
}) {
	const authData = useSelector(state => state.auth);
	const { isAuthed, loginLoadingStatus } = authData;

	if (checkIsOmitPath(location.pathname)) {
		return render({ isAuthed: false });
	}

	if (loginLoadingStatus === LOADING || loginLoadingStatus === NONE) {
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
