import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
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

const useStyles = makeStyles({
	layout: {
		display: 'flex',
		flexDirection: 'column',
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
const { LOGIN } = RouteKeyEnums;
const LoginSchema = Yup.object().shape({
	email: Yup.string().email('Invalid email').required('Required'),
	password: Yup.string().required('Required'),
});

function ForgetPasswordPage() {
	const classes = useStyles();

	const _handleLogin = (values, { setSubmitting }) => {
		console.log(values);
		setSubmitting(false);
	};

	return (
		<Container component="main" maxWidth="xs" className={classes.layout}>
			<Card
				variant="outlined"
				className={classes.form}
			>
				<Typography component="h1" variant="h5" align="center">
					FORGET PASSWORD
				</Typography>
				<Formik
					initialValues={{ email: '' }}
					onSubmit={_handleLogin}
					validationSchema={LoginSchema}
				>
					{({
						values: { email },
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
								<Button
									type="submit"
									fullWidth
									variant="contained"
									color="primary"
									className={classes.button}
								>
									RESET MY PASSWORD
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
	);
}

export default ForgetPasswordPage;
