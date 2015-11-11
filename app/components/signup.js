import React from 'react';
import {History} from 'react-router';
import store from '../store';
import {Button} from 'react-bootstrap'

const Signup = React.createClass({
	mixins: [History],

	getInitialState() {
		return {
			error: null,
		}
	},

	handleSubmit(e) {
		e.preventDefault();
		let username = this.refs.username.value;
		let email = this.refs.email.value;
		let password = this.refs.password.value;
		let passwordRepeat = this.refs.passwordRepeat.value;

		if(password === passwordRepeat){
			let user = store.getUser({username, email, password});
			user.save({
				hometown: {
					__type: 'Pointer',
					className: 'Town',
					objectId: session.getTownId(),
				}
			}, {error: (obj, response) => {
				this.setState({
					error: response.responseJSON.error,
				})
			}}).then(() =>{
				return session.authenticate({sessionToken: user.get('sessionToken')}).then(() => {
					session.setLocation();
					this.history.goBack();
				})
			})
		} else {
			this.setState({
				error: 'Your passwords do not match',
			})
		}
	},

	render() {
		return(
			<form className='signup-container' onSubmit={this.handleSubmit}>
				<h1>Sign Up</h1>
				<div className="signup-inputs">
					<input type="text" placeholder='Choose Username' ref='username'/>
					<input type="text" placeholder='email' ref='email'/>
					<input type="password" placeholder='Password' ref='password'/>
					<input type="password" placeholder='Repeat Password' ref='passwordRepeat'/>
				</div>
				<div className='button-container'>
					<p className='signup-error'>{!!this.state.error && this.state.error}</p>
					<Button className='signup-button' bsSize='lg' onClick={this.handleSubmit}>Sign Up</Button>
				</div>
			</form>
		)
	}
})

export default Signup;