import React from 'react';
import {History} from 'react-router';
import store from '../store';

const Signup = React.createClass({
	mixins: [History],

	handleSubmit(e) {
		e.preventDefault();
		let username = this.refs.email.value;
		let email = username;
		let password = this.refs.password.value;
		let session = store.getSession();

		let user = store.getUser({username, email, password});
		user.save().then(() =>{
			return session.authenticate({sessionToken: user.get('sessionToken')}).then(() => {
				session.setLocation();
				this.history.pushState({}, '/');
			})
		})
	},

	render() {
		return(
			<form action="" onSubmit={this.handleSubmit}>
				<h1>Sign Up</h1>
				<input type="text" placeholder='email' ref='email'/>
				<input type="password" placeholder='password' ref='password'/>
				<input type="submit" value='Sign Up'/>
			</form>
		)
	}
})

export default Signup;