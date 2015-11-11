import React from 'react';
import {Glyphicon} from 'react-bootstrap';
import store from '../store';
import _ from 'underscore';

const Picture = React.createClass({
	propTypes: {
		picture: React.PropTypes.object.isRequired,
		startCarousel: React.PropTypes.func.isRequired,
		i: React.PropTypes.number.isRequired,
	},

	getInitialState() {
		return {
			comments: store.getPictureComments(this.props.picture.get('objectId')),
		}
	},

	componentWillMount() {
		let comments = this.state.comments;
		comments.fetch().then(() => {
			this.setState({
				comments: comments
			})
		})
	},

	startCarousel(i) {
		this.props.startCarousel(i);
	},

	render() {
		let picture = this.props.picture;
		let i = this.props.i;
		let comments = this.state.comments;
		let likesArray = _.map(picture.get('likes'), (like) => {
			return JSON.parse(like)
		});

		return (
			<div className='picture-container' onClick={this.startCarousel.bind(this, i)} >
				<img src={picture.get('url')} />
				<div className="picture-container-stats">
					<Glyphicon 
						glyph='thumbs-up' 
						className='like-icon'>
						<span className='likes'>{likesArray.length}</span>
					</Glyphicon>
					<Glyphicon 
						glyph='comment' 
						className='comment-icon'>
						<span className='comments'>{comments.length}</span></Glyphicon>
				</div>
			</div>
		)
	}
})

export default Picture;