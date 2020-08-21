import React from 'react';
import { firebase } from '../firebase';

function Test() {
	function _handleClick() {
		firebase.database().collection('users').doc('l1QlvtcWACPOALHoCLAqmkBvFfr2').set({
			username: 'test',
			email: 'test@test.com',
			dashboardIds: ['u4AmpmmfJ4LRmKS1itPh'],
		});
	}

	return (
		<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
			<button type="button" onClick={_handleClick}>
				click
			</button>
		</div>
	);
}

export default Test;


