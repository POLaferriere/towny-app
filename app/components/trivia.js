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
		let townId = session.hasTown() && session.getTownId() || '';
		return {
			trivia: store.getTriviaCollection(townId),
		}
	},

	getInitialState() {
		return {
			triviaQuotes: [],
			addingTrivia: false,
		}
	},

	componentWillMount() {
		console.log(this.props.trivia);
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

//TODO make new posts go to the top
	onSubmit(id, text) {
		this.setState({
			addingTrivia: false,
		})
		this.props.trivia.create({
			body: text,
			town: {objectId: id}
		})
	},

	render() {
		let triviaQuotes = this.props.trivia || {};

		return (
			<div className='trivia-container'>
				{this.state.addingTrivia && <AddTrivia onSubmit={this.onSubmit}/>}

				<ul>
					{triviaQuotes.map((quote) => {
						return (<TriviaQuote key={quote.id} model={quote} onChange={this.onChange}/>)
					})}
				</ul>
				<Glyphicon glyph='plus-sign' className='trivia-add' onClick={this.handleAdd} />
			</div>
		);
	}
})

export default Trivia;
