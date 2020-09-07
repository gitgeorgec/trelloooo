import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';

const Login = lazy(() => import('./pages/login'));
const SignUp = lazy(() => import('./pages/sign-up'));
const ForgetPassword = lazy(() => import('./pages/forget-password'));
const Home = lazy(() => import('./pages/home'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const Test = lazy(() => import('./pages/test'));
const Profile = lazy(() => import('./pages/profile'));

export const RouteKeyEnums = {
	ROOT: '/',
	LOGIN: '/login',
	SIGN_UP: '/sign-up',
	FORGET_PASSWORD: '/forget-password',
	DASHBOARD: '/dashboard',
	PROFILE: '/profile',

	HOME: '/home',

	TEST: '/test',
};

const {
	ROOT,
	LOGIN,
	SIGN_UP,
	FORGET_PASSWORD,
	DASHBOARD,
	HOME,
	TEST,
	PROFILE,
} = RouteKeyEnums;

const routes = [
	{
		path: LOGIN,
		exact: true,
		component: Login,
	},
	{
		path: SIGN_UP,
		exact: true,
		component: SignUp,
	},
	{
		path: FORGET_PASSWORD,
		exact: true,
		component: ForgetPassword,
	},
	{
		path: HOME,
		exact: true,
		component: Home,
	},
	{
		path: `${DASHBOARD}/:dashboardId`,
		exact: true,
		component: Dashboard,
	},
	{
		path: TEST,
		exact: true,
		component: Test,
	},
	{
		path: PROFILE,
		exact: true,
		component: Profile,
	},
	{
		path: ROOT,
		exact: true,
		component: () => <Redirect to={HOME}/>,
	},
];

export default routes;
