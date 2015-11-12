import React from 'react';
import {Glyphicon} from 'react-bootstrap';
import store from '../store';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';
import moment from 'moment';

const commentTooltip = (<Tooltip>You must be logged in to comment</Tooltip>);

const TriviaComment = React.createClass({
	propTypes: {
		comment: React.PropTypes.object.isRequired,
		text: React.PropTypes.string.isRequired,
		triviaId: React.PropTypes.string.isRequired,
		commentId: React.PropTypes.string,
		creator: React.PropTypes.object,
		onReply: React.PropTypes.func,
		onRemove: React.PropTypes.func,
	},

	handleReply() {
		this.props.onReply()
	},

	handleRemove() {
		store.getTriviaComments(this.props.triviaId).get(this.props.commentId).destroy();
		this.props.onRemove();
	},

	render() {
		let triviaId = this.props.triviaId;
		console.log(this.props.comment);

		return (
			<li className='trivia-quote-comment'>
				<p>{this.props.text}</p>
				<div className="trivia-quote-comment-bottom">
					{session.hasUser() && <p className='trivia-quote-comment-reply' onClick={this.handleReply}>Reply</p>}
					{!session.hasUser() && 
						<OverlayTrigger placement='bottom' overlay={commentTooltip}>
							<p className='trivia-quote-comment-reply'>Reply</p>
						</OverlayTrigger>}
					<p className="trivia-quote-comment-by">{'by ' + this.props.comment.get('comment_by').username}</p>
					<p className="trivia-quote-comment-time">{moment(this.props.comment.get('createdAt')).fromNow()}</p>
				</div>
				{session.hasUser() &&  this.props.comment.get('comment_by').objectId == session.getUserId() &&
					<Glyphicon className='trivia-quote-comment-remove' glyph='remove' onClick={this.handleRemove}/>}
			</li>
		)
	}
});

export default TriviaComment;