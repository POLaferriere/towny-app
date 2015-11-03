import React from 'react';
import store from '../store'
import _ from 'underscore'
import { History } from 'react-router';
import TriviaQuote from './trivia-quote';

const Trivia = React.createClass({
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
			<div className='trivia-container'>
				<ul>
					{triviaQuotes.map((quote) => {
						return (<TriviaQuote key={quote.get('objectId')} model={quote}/>)
					})}
				</ul>
				<button onClick={this.handleAdd} data-reveal-id="myModal">Add Something</button>

				{this.props.children}
			</div>
		);
	}
})

export default Trivia;
