import React from 'react';
import { History } from 'react-router';

const TriviaQuote = React.createClass({
	propTypes: {
		model: React.PropTypes.object.isRequired,
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
		return(
			<li>
				<h5>{this.props.model.get('body')}</h5>
				<button onClick={this.handleDelete}>Delete</button>
				<button onClick={this.handleEdit}>Edit</button>
			</li>
		)
	}
})

export default TriviaQuote;