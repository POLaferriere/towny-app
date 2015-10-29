import React from 'react';
import store from '../store';
import $ from 'jquery';

const User = React.createClass({
	getInitialState() {
		return {
			changeUser: false,
			changePass: false,
		}
	},

	clickUsername() {
		this.setState({
			changeUser: true,
		})
	},

	clickPass() {
		console.log(this.refs);
		this.setState({
			changePass: true,
		})
	},

	handleChange(e) {
		e.preventDefault();
		let user = store.getCurrentUser();
		let username = this.refs.username.value || user.get('username');
		let password = this.refs.password.value
		$.ajax({
			url: 'https://api.parse.com/1/users/' + user.get('objectId'),
			method: 'PUT',
			data: JSON.stringify({
				username: username,
				password: password,
			})
		})
	},

	

	// handleChangePass(e) {
	// 	e.preventDefault();
	// 	let user = store.getCurrentUser();
	// 	let password = this.refs.password.value;
	// 	$.ajax({
	// 		url: 'https://api.parse.com/1/users/' + user.get('objectId'),
	// 		method: 'PUT',
	// 		data: JSON.stringify({
	// 			password: password
	// 		})
	// 	})
	// },

	render() {
		let user = store.getCurrentUser().toJSON();
		console.log(user);
		return (
			<div>
				<h1>User Settings</h1>
				<ul>
					<li>
						<p onClick={this.clickUsername}>Change Username</p>
						{this.state.changeUser && 
							<form action="" onSubmit={this.handleChange}>
								<input type="text" ref='username' defaultValue={user.username} />
							</form>}
					</li>
					<li>
						<p onClick={this.clickPass}>Change Password</p>
						{this.state.changePass && 
							<form action="" onSubmit={this.handleChange}>
								<input type="text" ref='password' />
							</form>}
					</li>
				</ul>
			</div>
		)
	}
});

export default User;