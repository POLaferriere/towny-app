import React from 'react';
import Geosuggest from 'react-geosuggest';
import {History} from 'react-router';
import store from '../store';
import Loading from 'react-loading';

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
		return (
			<div>
				<h1>Towny</h1>
				<p>Where's your town?</p>
				<button onClick={this.handleUseCurrentLoc}>Use current location</button>
				<p>or</p>
				<Geosuggest onSuggestSelect={this.handleSuggestSelect}></Geosuggest>
				{this.state.isLoading && (<Loading type='spokes' color='black' />)}
			</div>
		)
	}
})

export default Splash;