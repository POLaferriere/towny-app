import React from 'react';
import store from '../store';
import { Link, History } from 'react-router';
import functions from '../functions';
import {Glyphicon} from 'react-bootstrap';

var AddTrivia = React.createClass({
	propTypes: {
		triviaId: React.PropTypes.string,
		onSubmit: React.PropTypes.func,
	},

	mixins: [History],


	getInitialState() {
		return {
			trivia: {}
		}
	},

	componentWillMount(){
		let trivia = store.getTriviaCollection(session.getTownId());
		console.log(trivia);

		if (this.props.triviaId) {
			this.setState({
				trivia: trivia.get(this.props.triviaId)
			})
		} else {
			this.setState({
				trivia: store.getTriviaModel(),
			})
		}
		
	},

	handleEdit(event) {
		this.state.trivia.set('body', event.target.value)
		this.setState({
			trivia: this.state.trivia
		})
	},

	handleSubmit(e) {
		e.preventDefault();
		let text = this.state.trivia.get('body');
		let townId = session.getTownId();
		this.state.trivia.save({
			body: text,
			town: {objectId: townId}
		})
		this.props.onSubmit();

	},

	render() {
		console.log(this.state)
		let session = store.getSession();
		let location = this.state.location;
		let body = this.state.trivia.get('body');
		return (
			<form className='add-trivia' onSubmit={this.handleSubmit}>
				<input className='add-trivia-input' type="text" onKeyUp={this.handleEdit} defaultValue={(body) || ''}/>
				<Glyphicon glyph='plus' className='add-trivia-add' onClick={this.handleSubmit}/>
			</form>
		)
	}
})

export default AddTrivia;