import React from 'react';
import store from '../store';
import { History } from 'react-router';

var AddTrivia = React.createClass({
	mixins: [History],

	getDefaultProps() {
		return {
			triviaCollection: store.getTriviaCollection(),
		}
	},

	getInitialState() {
		return {
			trivia: store.getTriviaModel(),
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
		var _this = this;
		this.state.trivia.save().then(() => _this.props.triviaCollection.fetch());
		this.history.pushState({}, '/trivia');
	},

	render() {
		return (
			<form action="" onSubmit={this.handleSubmit}>
				<input type="text" onKeyUp={this.handleEdit}/>
				<input type="submit"/>
			</form>
		)
	}
})

export default AddTrivia;