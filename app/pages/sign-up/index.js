import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink, Redirect } from 'react-router-dom';
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
import { useSelector, useDispatch } from 'react-redux';
import { signUpAction } from '../../repositories/redux/actions/auth-actions';
import { usePrevious } from '../../lib/react-utils';
import { useEffect } from 'react';
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
	link: {
		color: 'white',
	},
});
const { LOADING, SUCCESS } = LoadingStatusEnum;
const { LOGIN, HOME } = RouteKeyEnums;
const LoginSchema = Yup.object().shape({
	email: Yup.string().email('Invalid email').required('Required'),
	password: Yup.string().required('Required'),
	username: Yup.string().required('Required'),
});

const propTypes = {
	onNavigate: PropTypes.func,
};

function SignUpPage({
	onNavigate,
}) {
	const classes = useStyles();
	const authData = useSelector(state => state.auth);
	const { isAuthed, signUpLoadingStatus } = authData;
	const prevSignUpLoadingStatus = usePrevious(signUpLoadingStatus);
	const dispatch = useDispatch();

	useEffect(() => {
		if (prevSignUpLoadingStatus === LOADING && signUpLoadingStatus === SUCCESS) {
			onNavigate(HOME);
		}
	}, [signUpLoadingStatus]);

	const _handleSignUp = (values, { setSubmitting }) => {
		const { email, password, username } = values;

		dispatch(signUpAction(email, password, username));
		setSubmitting(false);
	};

	return (
		isAuthed ? <Redirect to={HOME}/> : (
			<Container component="main" maxWidth="xs" className={classes.layout}>
				<Card
					variant="outlined"
					className={classes.form}
				>
					<Typography component="h1" variant="h5" align="center">
						Sign Up
					</Typography>
					<Formik
						initialValues={{ email: '', password: '', username: '' }}
						onSubmit={_handleSignUp}
						validationSchema={LoginSchema}
					>
						{({
							values: { email, password, username },
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
										label="User Name"
										name="username"
										value={username}
										onChange={handleChange}
										onBlur={handleBlur}
										error={errors.username && touched.username}
										helperText={(errors.username && touched.username) && errors.username}
									/>
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
										Sign Up
									</Button>
								</form>
							);
						}}
					</Formik>
				</Card>
				<Grid container>
					<Grid item>
						<Link to={LOGIN} component={RouterLink} className={classes.link}>
							back to login
						</Link>
					</Grid>
				</Grid>
			</Container>
		)
	);
}

SignUpPage.propTypes = propTypes;

export default SignUpPage;
