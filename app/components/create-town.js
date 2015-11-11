import React from 'react';
import Geosuggest from 'react-geosuggest';
import _ from 'underscore'
import {Button} from 'react-bootstrap'
import store from '../store';
import $ from 'jquery';
import {History} from 'react-router';

const CreateTown = React.createClass({
	getDefaultProps() {
		return {
			towns: store.getTownCollection()
		}
	},

	getInitialState() {
		return {
			pickingTown: true,
			townExists: false,
			selectedTown: '',
			selectedLoc: {},
		}
	},

	mixins: [History],

	handleSelect(suggest) {
		let name = suggest.label.split(',');
		name =_.first(name, 2).join();
		this.setState({
			selectedTown: name,
			selectedLoc: suggest.location,
			pickingTown: false,
		})

		let towns = this.props.towns
		if (towns.any((town) => {
			return town.get('name') == name;
		})) {
			this.setState({
				townExists: true,
			})
		}
	},

	goToExistingTown() {
		let towns = this.props.towns;
		let townId = towns.findWhere({name: this.state.selectedTown}).get('objectId');
		session.setTown(store.getTown(townId));
		this.history.pushState({}, '/town/' + townId + '/landing');
	},

	repick() {
		this.setState({
			pickingTown: true,
		})
	},

	create() {
		let name = this.state.selectedTown;
		let location = this.state.selectedLoc;
		$.ajax({
			url: 'https://api.parse.com/1/classes/Town',
			method: 'POST',
			data: JSON.stringify({
				name: name,
				location: {
					__type: 'GeoPoint',
					latitude: location.lat,
					longitude: location.lng,
				}
			})
		}).then((results) => {
			let townId = results.objectId
			this.props.towns.fetch().then(() => {
				session.setTown(store.getTown(townId));
				this.history.pushState({}, '/town/' + townId + '/landing')
			})
		})
	},

	render() {
		return (
			<div className="create-town-container">
				{this.state.pickingTown &&
					<Geosuggest 
						placeholder='Find your town' 
						onSuggestSelect={this.handleSelect}
						className='create-town-geosuggest'/>
				}
				{!this.state.pickingTown && 
					<div className='create-town-picked'>
						<h2>{'Your town is ' + this.state.selectedTown}</h2>
						{this.state.townExists &&
							<div>
								<h1>Your town has already been established</h1>
								<Button 
									className='create-town-button' 
									onClick={this.goToExistingTown}
									bsSize='lg'>
									Go to your town
								</Button>
								<p>Not your town? <span className='create-town-repick' onClick={this.repick}>Click here to search again</span></p>
							</div>}
						{!this.state.townExists && 
							<div>
								<Button 
									className='create-town-button' 
									onClick={this.create}
									bsSize='lg'>
									Create your town
								</Button>
								<p>Not your town? <span className='create-town-repick' onClick={this.repick}>Click here to search again</span></p>
							</div>}
					</div>}
			</div>
		)
	}
});

export default CreateTown;