import React from 'react';
import store from '../store';
import { Link, History } from 'react-router';
import functions from '../functions';
import {Button} from 'react-bootstrap';
import $ from 'jquery';

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

	componentDidMount() {
		$('.add-trivia-input').focus();
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
		}).then(() => {
			this.props.onSubmit();
		})
	},

	render() {
		let session = store.getSession();
		let location = this.state.location;
		let body = this.state.trivia.get('body');
		return (
			<form className='add-trivia' onSubmit={this.handleSubmit}>
				<textarea 
					className='add-trivia-input' 
					type="text" 
					onKeyUp={this.handleEdit} 
					defaultValue={(body) || ''}
					rows={8}>
				</textarea>
				<Button bsSize='large' bsStyle='primary' className='add-trivia-button' onClick={this.handleSubmit}>Submit</Button>
			</form>
		)
	}
})

export default AddTrivia;