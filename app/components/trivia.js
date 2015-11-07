import React from 'react';
import store from '../store'
import _ from 'underscore'
import { History } from 'react-router';
import TriviaQuote from './trivia-quote';
import {Glyphicon} from 'react-bootstrap';
import AddTrivia from './add-trivia'

const Trivia = React.createClass({
	mixins: [History],

	getInitialState() {
		return {
			triviaQuotes: [],
			addingTrivia: false,
			trivia: store.getTriviaCollection(session.getTownId())
		}
	},

	componentWillMount() {
		this.state.trivia.fetch().then(() => {this.forceUpdate()});
	},

	handleAdd(e) {
		e.preventDefault();
		this.setState({
			addingTrivia: true,
		})
	},

//TODO make new posts go to the top
	onSubmit() {
		this.state.trivia.fetch().then(() =>{
			this.setState({
				addingTrivia: false,
			})
		})
	},

	render() {
		let triviaQuotes = this.state.trivia || {};

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
