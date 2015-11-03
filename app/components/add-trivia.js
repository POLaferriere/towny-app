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

	getDefaultProps() {
		return {
			triviaCollection: store.getTriviaCollection(),
		}
	},

	getInitialState() {
		if(this.props.triviaId) {
			console.log(this.props.triviaCollection.get(this.props.triviaId))
			return {trivia: this.props.triviaCollection.get(this.props.triviaId)}
		} else {
			return {trivia: store.getTriviaModel()}
		}
	},

	componentWillMount() {
		let session = store.getSession();
		let location = session.get('location');
		this.state.trivia.set('location', location);
		functions.getLoc(location).then((results) => {
			this.setState({
	 			location: results.results[0].formatted_address
	 		})
		})
	},

	handleEdit(event) {
		this.state.trivia.set('body', event.target.value)
		this.setState({
			trivia: this.state.trivia
		})
	},

	handleSubmit(e) {
		e.preventDefault();
		var _this = this;
		this.state.trivia.save().then(() => _this.props.triviaCollection.fetch());
		this.props.onSubmit();
	},

	render() {
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