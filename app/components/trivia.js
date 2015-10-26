import React from 'react';
import store from '../store'
import _ from 'underscore'
import { History } from 'react-router';

var Trivia = React.createClass({
	mixins: [History],

	getDefaultProps() {
		return {
			trivia: store.getTriviaCollection(),
		}
	},

	getInitialState() {
		return {
			triviaQuotes: [],
		}
	},

	componentWillMount() {
		this.props.trivia.fetch();
		this.props.trivia.on('add remove sync', this.forceUpdate.bind(this, null), this);
	},

	componentWillUnmount() {
		this.props.trivia.off('add remove sync', null, this);
	},

	handleAdd(e) {
		e.preventDefault();
		this.history.pushState({}, '/trivia/new');

	},

	render() {
		let triviaQuotes = this.props.trivia || {};

		return (
			<div>
				<h1>Trivia</h1>
				<ul>
					{triviaQuotes.map((quote) => {
						return (<li key={quote.get('objectId')}>{quote.get('body')}</li>)
					})}
				</ul>
				<button onClick={this.handleAdd}>Add Something</button>

				{this.props.children}
			</div>
		);
	}
})

export default Trivia;
