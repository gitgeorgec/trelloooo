import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { FirebaseContext } from '../../firebase';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core';
import { RouteKeyEnums } from '../../routes';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { loginAction } from '../../repositories/redux/actions/auth-actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { usePrevious } from '../../lib/react-utils';
import { LoadingStatusEnum } from '../../lib/enums';

const useStyles = makeStyles({
	layout: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		minHeight: '100vh',
	},
	form: {
		padding: '30px 15px',
	},
	button: {
		marginTop: 30,
	},
});
const { LOADING, SUCCESS } = LoadingStatusEnum;
const { SIGN_UP, FORGET_PASSWORD, HOME } = RouteKeyEnums;
const LoginSchema = Yup.object().shape({
	email: Yup.string().email('Invalid email').required('Required'),
	password: Yup.string().required('Required'),
});

const propTypes = {
	onNavigate: PropTypes.func,
};

function LoginPage({
	onNavigate,
}) {
	const classes = useStyles();
	// const { api, auth, } = useContext(FirebaseContext);
	const loginLoadingStatus = useSelector(state => state.auth.loadingStatus);
	const prevLoginLoadingStatus = usePrevious(loginLoadingStatus);
	const dispatch = useDispatch();

	useEffect(() => {
		if (prevLoginLoadingStatus === LOADING && loginLoadingStatus === SUCCESS) {
			onNavigate(HOME);
		}
	});

	const _handleLogin = (values, { setSubmitting }) => {
		const { email, password } = values;

		// api.login(email, password);
		dispatch(loginAction(email, password));
		setSubmitting(false);
	};

	return (
		<Container component="main" maxWidth="xs" className={classes.layout}>
			<Card
				variant="outlined"
				className={classes.form}
			>
				<Typography component="h1" variant="h5" align="center">
					LOGIN
				</Typography>
				<Formik
					initialValues={{ email: '', password: '' }}
					onSubmit={_handleLogin}
					validationSchema={LoginSchema}
				>
					{({
						values: { email, password },
						errors,
						touched,
						handleChange,
						handleBlur,
						handleSubmit,
					}) => {
						return (
							<form onSubmit={handleSubmit}>
								<TextField
									variant="outlined"
									margin="normal"
									fullWidth
									label="Email Address"
									name="email"
									value={email}
									onChange={handleChange}
									onBlur={handleBlur}
									error={errors.email && touched.email}
									helperText={(errors.email && touched.email) && errors.email}
								/>
								<TextField
									variant="outlined"
									margin="normal"
									fullWidth
									name="password"
									label="Password"
									type="password"
									value={password}
									onChange={handleChange}
									onBlur={handleBlur}
									error={errors.password && touched.password}
									helperText={(errors.password && touched.password) && errors.password}
								/>
								<Button
									type="submit"
									fullWidth
									variant="contained"
									color="primary"
									className={classes.button}
								>
									Login In
								</Button>
							</form>
						);
					}}
				</Formik>
			</Card>
			<Grid container>
				<Grid item xs>
					<Link to={FORGET_PASSWORD} component={RouterLink}>
						Forgot password?
					</Link>
				</Grid>
				<Grid item>
					<Link to={SIGN_UP} component={RouterLink}>
						Sign Up
					</Link>
				</Grid>
			</Grid>
		</Container>
	);
}

LoginPage.propTypes = propTypes;

export default LoginPage;
