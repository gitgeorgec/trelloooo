import React, { Component } from 'react';
import AuthRoute from './auth-route';
import LayoutRoute from './layout-route';

class App extends Component {
	render() {
		return (
			<AuthRoute
				render={isAuthed => <LayoutRoute isAuthed={isAuthed}/>}
			/>
		);
	}
}

export default App;
