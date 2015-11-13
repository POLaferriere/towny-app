import React from 'react';
import store from '../store';

const CommentForm = React.createClass({
	propTypes: {
		triviaId: React.PropTypes.string,
		onComment: React.PropTypes.func,
	},

	getInitialState() {
		return {
			comment: ''
		}
	},

	handleChange(e) {
		this.setState({
			comment: e.target.value
		})
	},

	handleSubmit(e) {
		e.preventDefault();
		
		let userId = session.get('currentUser').get('objectId');
		let id = this.props.triviaId;
		let comment = this.state.comment
    let comments = store.getTriviaComments(id);
    comments.create({
      text: comment,
      comment_on: {objectId: id},
      comment_by: {objectId: userId}, 
    }, {
    	success: () => {this.props.onComment()}
    })
	},

	render() {
		return (
			<form className='comment-form' onSubmit={this.handleSubmit}>
				<input type="text" className='comment-form-input' value={this.state.comment} onChange={this.handleChange}/>
			</form>
		)
	}
});

export default CommentForm;