import React from 'react';
import store from '../store';
import {History} from 'react-router';
import functions from '../functions';

const Login = React.createClass({
	mixins: [History],

	getInitialState() {
		return {
			error: false
		}
	},

	handleSubmit(e) {
		e.preventDefault()
		let username = this.refs.username.value;
		let password = this.refs.password.value;
		let session = store.getSession();

		session.authenticate({username, password}).then(() => {
			session.setLocation();
			this.history.pushState({}, '/');
		}, this.setState({error: true}))
	},

	render() {
		return(
			<form action="" onSubmit={this.handleSubmit}>
				<h1>Login</h1>
				<input type="text" placeholder='email' ref='username'/>
				<input type="password" placeholder='password' ref='password'/>
				{this.state.error && (<p>Incorrect username or password</p>)}
				<input type="submit"/>
			</form>

		)
	}
});

export default Login;