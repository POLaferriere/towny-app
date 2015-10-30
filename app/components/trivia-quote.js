import React from 'react';
import { History } from 'react-router';
import _ from 'underscore';
import functions from 'functions';
import moment from 'moment';
import CommentForm from './comment-form';
import store from '../store';
import Comments from './comments'

const TriviaQuote = React.createClass({
	propTypes: {
		model: React.PropTypes.object.isRequired,
	},

	getInitialState() {
		return {
			location: 'undefined',
			seeComments: false,
			commenting: false,
			comments: store.getTriviaComments(this.props.model.get('objectId')),
		}
	},

	componentWillMount() {
		this.state.comments.fetch().then(() => {
			this.setState({
				comments: this.state.comments
			})
		});
		functions.getLoc(this.props.model.get('location')).then((results) => {
			this.setState({
				location: results.results[0].formatted_address
			})
		})
	},

	mixins: [History],

	handleDelete(e) {
		e.preventDefault();
		this.props.model.destroy();
	},

	handleEdit(e) {
		e.preventDefault();
		this.history.pushState({}, '/trivia/new/' + this.props.model.get('objectId'));
	},

	handleComment(e) {
		e.preventDefault();
		this.setState({
			commenting: true,
		});
	},

	seeComments() {
		console.log('see');
		this.setState({
			seeComments: true,
		})
	},

	onComment() {
		this.forceUpdate();
	},

	render() {
		let body = this.props.model.get('body');
		let location = this.state.location;
		let created = this.props.model.get('createdAt');
		let triviaId = this.props.model.get('objectId');
		let comments = this.state.comments.length;
		//TODO add code for when there are no comments
		return(
			<li>
				<h5>{body}</h5>
				<p>{location}</p>
				<p>{moment(created, moment.ISO_8601).fromNow()}</p>
				<p onClick={this.seeComments}><span>{comments}</span>Comments</p>
				{this.state.seeComments && this.state.comments.map((comment) => {
					return <Comments text={comment.get('text')} triviaId={triviaId} key={comment.get('objectId')}/> 
				})}

				<button onClick={this.handleDelete} className='button alert'>Delete</button>
				<button onClick={this.handleEdit} >Edit</button>
				
			</li>
		)
	}
})

export default TriviaQuote;