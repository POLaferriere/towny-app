import React from 'react';
import { History } from 'react-router';
import _ from 'underscore';
import functions from 'functions';
import moment from 'moment';

const TriviaQuote = React.createClass({
	propTypes: {
		model: React.PropTypes.object.isRequired,
	},

	getInitialState() {
		return {
			location: _.values(this.props.model.get('location')).join()
		}
	},

	componentWillMount() {
		functions.getLoc(this.state.location).then((results) => {
			this.setState({
				location: results.results[1].formatted_address
			})
		})
	},

	mixins: [History],

	handleDelete(e) {
		e.preventDefault();
		this.props.model.destroy();
	},

	handleEdit(e) {
		e.preventDefault();
		this.history.pushState({}, '/trivia/new/' + this.props.model.get('objectId'));
	},

	render() {
		let body = this.props.model.get('body');
		let location = this.state.location;
		let created = this.props.model.get('createdAt')

		return(
			<li>
				<h5>{body}</h5>
				<p>{location}</p>
				<p>{moment(created, moment.ISO_8601).fromNow()}</p>
				<button onClick={this.handleDelete} className='button alert'>Delete</button>
				<button onClick={this.handleEdit} >Edit</button>
			</li>
		)
	}
})

export default TriviaQuote;