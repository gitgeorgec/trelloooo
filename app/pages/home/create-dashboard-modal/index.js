import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Formik } from 'formik';
import * as Yup from 'yup';
import PropType from 'prop-types';

const propTypes = {
	isVisible: PropType.bool.isRequired,
	onClose: PropType.func,
	onCreate: PropType.func,
};
const defaultProps = {
	onClose: () => {},
	onCreate: () => {},
};

function CreateDashboardModal({
	isVisible,
	onClose,
	onCreate,
}) {
	function _handleSubmit(value, { resetForm }) {
		onCreate(value);
		resetForm();
	}

	return (
		<Dialog
			open={isVisible}
			onClose={onClose}
			fullWidth
		>
			<Formik
				initialValues={{ name: '' }}
				onSubmit={_handleSubmit}
				validationSchema={Yup.object().shape({
					name: Yup.string().required('Name is required'),
				})}
			>
				{({
					errors,
					touched,
					values: { name },
					handleChange,
					handleSubmit,
				}) => (
					<form onSubmit={handleSubmit}>
						<DialogTitle>New Board</DialogTitle>
						<DialogContent>
							<TextField
								autoFocus
								fullWidth
								margin="dense"
								name="name"
								label="Board Name"
								onChange={handleChange}
								error={errors.name && touched.name}
								helperText={(errors.name && touched.name) && errors.name}
								value={name}
							/>
						</DialogContent>
						<DialogActions>
							<Button onClick={onClose} color="primary">
								Cancel
							</Button>
							<Button color="primary" type="submit">
								Create
							</Button>
						</DialogActions>
					</form>
				)}
			</Formik>
		</Dialog>
	);
}

CreateDashboardModal.propTypes = propTypes;
CreateDashboardModal.defaultProps = defaultProps;

export default CreateDashboardModal;
