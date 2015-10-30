import React from 'react';
import CommentForm from './comment-form';

const Comments = React.createClass({
	propTypes: {
		text: React.PropTypes.string.isRequired,
		triviaId: React.PropTypes.string.isRequired,
		onComment: React.PropTypes.func
	},

	getInitialState() {
		return {
			commenting: false,
		}
	},

	handleComment() {
		this.setState({
			commenting:true,
		})
	},

	onComment() {
		this.setState({
			commenting: false,
		});
		this.props.onComment();
	},

	render(){
		return (
			<div>
				<p>{this.props.text}</p>
				<button onClick={this.handleComment}>Comment</button>
				{this.state.commenting && (<CommentForm triviaId={this.props.triviaId} onComment={this.onComment}/>)}
			</div>
		)
	}
})

export default Comments;