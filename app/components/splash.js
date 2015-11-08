import React from 'react';
import Geosuggest from 'react-geosuggest';
import {History} from 'react-router';
import store from '../store';
import Loading from 'react-loading';
import {Button, ButtonGroup} from 'react-bootstrap';
import functions from '../functions'
import $ from 'jquery';

const Splash = React.createClass({
	propTypes: {
		onSetLocation: React.PropTypes.func,
		onSetTown: React.PropTypes.func,
		onNoTown: React.PropTypes.func,
	},

	getInitialState() {
		return {
			isLoading: false,
		}
	},

	mixins: [History],

	handleUseCurrentLoc() {
		functions.getGeo().then((result) => {
			let lat = result.coords.latitude;
			let long = result.coords.longitude;
			$.ajax({
				url: 'https://api.parse.com/1/classes/Town?where=' + JSON.stringify({
					location: {
						$nearSphere : {
							__type: 'GeoPoint',
							'latitude': lat,
							'longitude': long,
						}
					}
				})
			}).then((results) => {
				let towns = store.getTownCollection();
				session.setTown(towns.get(results.results[0].objectId))
				this.props.onSetLocation();
			})
		})
		this.setState({
			isLoading: true,
		})
	},

	handleUseUserLoc() {
		let session = store.getSession();
		let loc = session.get('currentUser').get('hometown');
		let towns = store.getTownCollection();
		session.setTown(towns.get(loc.objectId));
		this.props.onSetTown();
	},

	handleSuggestSelect(suggest) {
		let name = suggest.gmaps.address_components[0].long_name + ', ' + suggest.gmaps.address_components[2].short_name;
		let lat = suggest.location.lat;
		let long = suggest.location.lng;
		$.ajax({
			url: 'https://api.parse.com/1/classes/Town?where=' + JSON.stringify({
				location: {
					$nearSphere : {
						__type: 'GeoPoint',
						'latitude': lat,
						'longitude': long,
					},
					$maxDistanceInMiles: 20.0,
				}
			})
		}).then((results) => {
			if(results.results.length == 0) {
				this.props.onNoTown(name);
			} else {
				let towns = store.getTownCollection();
				session.setTown(towns.get(results.results[0].objectId))
				this.props.onSetTown();
			}
		})
	},

	render() {
		let isLoading = this.state.isLoading;
		return (
			<div className='intro-splash'>
				<div className='splash-container'>
					<h1>Towny</h1>
					{this.props.townsLoaded && 
						<div>
							<p>What's your hometown?</p>
							<ButtonGroup className="login-buttons">
								<Button 
									className='get-hometown'
									bsStyle='primary' 
									disabled={isLoading} 
									onClick={this.handleUseCurrentLoc}>
									{isLoading ? 'Getting location...' : 'Use current location'}
								</Button>
								<Button className='user-hometown' onClick={this.handleUseUserLoc}>Go to your Hometown</Button>
							</ButtonGroup>
							<p>or</p>
							<Geosuggest className='splash-geosuggest' onSuggestSelect={this.handleSuggestSelect} placeholder='Find your town'></Geosuggest>
						</div>}
				</div>
			</div>
		)
	}
})

export default Splash;