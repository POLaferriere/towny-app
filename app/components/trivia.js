import React from 'react';
import store from '../store'
import _ from 'underscore'
import { History } from 'react-router';
import TriviaQuote from './trivia-quote';
import {Glyphicon} from 'react-bootstrap';
import AddTrivia from './add-trivia'

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
			addingTrivia: false,
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
		this.setState({
			addingTrivia: true,
		})
	},

	onSubmit() {
		this.setState({
			addingTrivia: false,
		})
	},

	render() {
		let triviaQuotes = this.props.trivia || {};

		return (
			<div className='trivia-container'>
				{this.state.addingTrivia && <AddTrivia onSubmit={this.onSubmit}/>}

				<ul>
					{triviaQuotes.map((quote) => {
						return (<TriviaQuote key={quote.get('objectId')} model={quote}/>)
					})}
				</ul>
				<Glyphicon glyph='plus-sign' className='trivia-add' onClick={this.handleAdd} />
			</div>
		);
	}
})

export default Trivia;
