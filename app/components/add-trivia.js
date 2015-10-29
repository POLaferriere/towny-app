import React from 'react';
import store from '../store';
import { Link, History } from 'react-router';
import functions from '../functions';

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
		let session = store.getSession();
		let location = session.get('location');
		console.log(location);
		functions.getLoc(location).then((results) => {
			console.log(results);
			this.setState({
	 			trivia: this.state.trivia.set('location', results.results[0].formatted_address)
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
		let session = store.getSession();
		let location = this.state.trivia.get('location');
		return (
			<form action="" onSubmit={this.handleSubmit}>
				<input type="text" onKeyUp={this.handleEdit} defaultValue={this.state.trivia.get('body') || ''}/>
				<p>{'You are posting about ' + this.state.trivia.get('location')}
					<Link to={'/trivia/modal/'}>Change your location</Link>
				</p>
				<input type="submit"/>
			</form>
		)
	}
})

export default AddTrivia;