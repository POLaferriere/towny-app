import React from 'react';
import store from '../store';
import {History} from 'react-router';
import functions from '../functions';
import {Button} from 'react-bootstrap';

const Login = React.createClass({
	propTypes: {
		onLogin: React.PropTypes.func,
		popover: React.PropTypes.bool,
	},

	mixins: [History],

	getInitialState() {
		return {
			error: false
		}
	},

	handleSubmit(e) {
		e.preventDefault();
		let username = this.refs.username.value;
		let password = this.refs.password.value;
		let session = store.getSession();

		session.authenticate({username, password}).then(() => {this.props.onLogin();}, this.setState({error: true}))
	},

	goToSignup() {
		this.history.pushState({}, '/signup')
	},

	render() {
		return(
			<form className='login-container' onSubmit={this.handleSubmit}>
				{!this.props.popover && <h3 className={'login-title '}>You must login to feed your town(y)</h3>}
				{this.props.popover && <h3 className='login-title popover-header'>Login to Town(y)</h3>}
				<div className="login-container-inputs">
					<input type="text" placeholder='email' ref='username'/>
					<input type="password" placeholder='password' ref='password'/>
					{this.state.error && (<p className='login-error'>Incorrect username or password</p>)}
					<Button className='login-button' bsSize='lg' onClick={this.handleSubmit}>Submit</Button>
					<p className='login-signup'>Not a member? <span className='link' onClick={this.goToSignup}>Click here to sign up</span></p>
				</div>
			</form>

		)
	}
});

export default Login;