import React from 'react';
import Geosuggest from 'react-geosuggest';
import {History} from 'react-router';
import store from '../store';

const Splash = React.createClass({
	propTypes: {
		onSetLocation: React.PropTypes.func,
	},

	mixins: [History],

	handleUseCurrentLoc() {
		let session = store.getSession();
		session.setLocation();
		this.props.onSetLocation();
	},

	handleSuggestSelect(suggest) {
		let session = store.getSession();
		session.setLocation(suggest.location)
		this.props.onSetLocation();
	},

	render() {
		return (
			<div>
				<h1>Towny</h1>
				<p>Where's your town?</p>
				<button onClick={this.handleUseCurrentLoc}>Use current location</button>
				<p>or</p>
				<Geosuggest onSuggestSelect={this.handleSuggestSelect}></Geosuggest>
			</div>
		)
	}
})

export default Splash;