import React from 'react';
import Comment from './comment';
import CommentForm from './comment-form';

const Comments = React.createClass({
	propTypes: {
		comments: React.PropTypes.object.isRequired,
		triviaId: React.PropTypes.string.isRequired,
		onChange: React.PropTypes.func,
	},

	getInitialState() {
		return{
			commenting: false,
		}
	},

	setCommenting() {
		this.setState({
			commenting: true,
		})
	},

	onRemove() {
		this.forceUpdate();
		this.props.onChange();
	},

	onComment() {
		this.setState({
			commenting: false,
		});
		this.props.onChange();
	},

	render(){
		let triviaId = this.props.triviaId;

		return (
			<ul className='trivia-quote-comments'>
				{!this.props.comments.length && !this.state.commenting &&
					<p>There's nothing here. <span className='trivia-quote-comments-first' onClick={this.setCommenting}>Be the first to say something</span></p>}
				{this.props.comments.map((comment) => {
					return (
					<Comment 
						text={comment.get('text')} 
						triviaId={triviaId} 
						onReply={this.setCommenting} 
						onRemove={this.onRemove}
						commentId={comment.get('objectId')} 
						key={comment.get('objectId')}/>)}
				)}
				{this.state.commenting && (<CommentForm triviaId={triviaId} onComment={this.onComment}/>)}
			</ul>
		)
	}
})

export default Comments;