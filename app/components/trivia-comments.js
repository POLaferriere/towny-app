import React from 'react';
import TriviaComment from './trivia-comment';
import CommentForm from './comment-form';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';

const commentTooltip = (<Tooltip>You must be logged in to comment</Tooltip>);

const TriviaComments = React.createClass({
	propTypes: {
		comments: React.PropTypes.object.isRequired,
		triviaId: React.PropTypes.string.isRequired,
		creator: React.PropTypes.object.isRequired,
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
		this.forceUpdate();
		this.props.onChange();
	},

	render(){
		let triviaId = this.props.triviaId;

		return (
			<ul className='trivia-quote-comments'>
				{!this.props.comments.length && !this.state.commenting &&
					<p>{"There's nothing here. "}
						{session.hasUser() && <span className='trivia-quote-comments-first' onClick={this.setCommenting}>Be the first to say something</span>}
						{!session.hasUser() && 
							<OverlayTrigger placement='bottom' overlay={commentTooltip}>
								<span className='trivia-quote-comments-first'>Be the first to say something</span>
							</OverlayTrigger>}
					</p>}
				{this.props.comments.map((comment) => {
					return (
					<TriviaComment 
						comment={comment}
						text={comment.get('text')} 
						triviaId={triviaId} 
						onReply={this.setCommenting} 
						onRemove={this.onRemove}
						commentId={comment.get('objectId')} 
						creator={this.props.creator}
						key={comment.get('objectId')}/>)}
				)}
				{this.state.commenting && (<CommentForm triviaId={triviaId} onComment={this.onComment}/>)}
			</ul>
		)
	}
})

export default TriviaComments;