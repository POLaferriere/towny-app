import React from 'react';
import {Glyphicon} from 'react-bootstrap';
import store from '../store';

const TriviaComment = React.createClass({
	propTypes: {
		text: React.PropTypes.string.isRequired,
		triviaId: React.PropTypes.string.isRequired,
		commentId: React.PropTypes.string,
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

		return (
			<li className='trivia-quote-comment'>
				<p>{this.props.text}</p>
				<p className='trivia-quote-comment-reply' onClick={this.handleReply}>Reply</p>
				<Glyphicon className='trivia-quote-comment-remove' glyph='remove' onClick={this.handleRemove}/>
			</li>
		)
	}
});

export default TriviaComment;