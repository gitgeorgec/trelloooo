import { lazy } from 'react';

const Login = lazy(() => import('./pages/login'));
const SignUp = lazy(() => import('./pages/sign-up'));
const ForgetPassword = lazy(() => import('./pages/forget-password'));
const Home = lazy(() => import('./pages/home'));
const Dashboard = lazy(() => import('./pages/dashboard'));

export const RouteKeyEnums = {
	ROOT: '/',
	LOGIN: '/login',
	SIGN_UP: '/sign-up',
	FORGET_PASSWORD: '/forget-password',
	DASHBOARD: '/dashboard',

	HOME: '/home',
};

const {
	ROOT,
	LOGIN,
	SIGN_UP,
	FORGET_PASSWORD,
	DASHBOARD,
	HOME,
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
		path: ROOT,
		exact: true,
		redirectPath: HOME,
	},
];

export default routes;
