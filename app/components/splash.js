import React from 'react';
import Geosuggest from 'react-geosuggest';
import {History} from 'react-router';
import store from '../store';
import Loading from 'react-loading';
import {Button} from 'react-bootstrap';

const Splash = React.createClass({
	propTypes: {
		onSetLocation: React.PropTypes.func,
	},

	getInitialState() {
		return {
			isLoading: false,
		}
	},

	mixins: [History],

	handleUseCurrentLoc() {
		let session = store.getSession();
		session.setLocation().then(() => {
			this.props.onSetLocation();
			this.setState({
				isLoading: false,
			})
		});
		this.setState({
			isLoading: true,
		})
	},

	handleSuggestSelect(suggest) {
		let session = store.getSession();
		session.setLocation(suggest.location)
		this.props.onSetLocation();
	},

	render() {
		let isLoading = this.state.isLoading;
		return (
			<div className='intro-splash'>
				<div className='splash-container'>
					<h1>Towny</h1>
					<p>What's your hometown?</p>
					<Button bsStyle='primary' disabled={isLoading} onClick={this.handleUseCurrentLoc}>{isLoading ? 'Getting location...' : 'Use current location'}</Button>
					<p>or</p>
					<Geosuggest className='splash-geosuggest' onSuggestSelect={this.handleSuggestSelect} placeholder='Find your town'></Geosuggest>
				</div>
			</div>
		)
	}
})

export default Splash;