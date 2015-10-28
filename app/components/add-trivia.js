import React from 'react';
import store from '../store';
import { History } from 'react-router';
import functions from '../functions'

var AddTrivia = React.createClass({
	mixins: [History],

	getDefaultProps() {
		return {
			triviaCollection: store.getTriviaCollection(),
		}
	},

	getInitialState() {
		if(this.props.params.id) {
			return {trivia: this.props.triviaCollection.get(this.props.params.id)}
		} else {
			return {trivia: store.getTriviaModel()}
		}
	},

	componentWillMount() {
		 functions.getGeo().then((position) => {
		 	this.setState({
		 		trivia: this.state.trivia.set('location', {lat: position.coords.latitude, long: position.coords.longitude})
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
		this.history.pushState({}, '/trivia');
	},

	render() {
		return (
			<form action="" onSubmit={this.handleSubmit}>
				<input type="text" onKeyUp={this.handleEdit} defaultValue={this.state.trivia.get('body') || ''}/>
				<input type="submit"/>
			</form>
		)
	}
})

export default AddTrivia;