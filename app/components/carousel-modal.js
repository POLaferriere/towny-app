import React from 'react';
import {Carousel, CarouselItem, Glyphicon, Panel} from 'react-bootstrap';
import store from '../store';

const CarouselModal = React.createClass({
	propTypes: {
		startingIndex: React.PropTypes.number.isRequired,
		showComments: React.PropTypes.func,
		onSlide: React.PropTypes.func,
	},

	getInitialState() {
		return {
			index: this.props.startingIndex,
			direction: null,
			showComments: false,
		}
	},

	handleSelect(index, dir) {
		this.setState({
			index: index,
			direction: dir,
		})
		this.props.onSlide();
	},	

	like(picture) {
		picture.set('likes', picture.get('likes')+1);
		picture.save().then(() => {this.forceUpdate()});
	},

	showComments(comments) {
		this.props.showComments(comments);
	},

	render() {
		let pictures = store.getPictureCollection(session.getTownId());

		return (
			<Carousel 
				indicators={false} 
				interval={0} 
				activeIndex={this.state.index} 
				direction={this.state.direction}
				onSelect={this.handleSelect}>
				{pictures.map((picture) => {
					let comments = store.getPictureComments(picture.get('objectId'));

					return (
						<CarouselItem>
							<img width={900} src={picture.get('url')} />
							<p className="carousel-modal-caption">{picture.get('caption')}</p>
							<div className="carousel-modal-stats">
								<Glyphicon 
									glyph='thumbs-up' 
									className='like-icon' 
									onClick={this.like.bind(this, picture)}>
									<span className='likes'>{picture.get('likes')}</span>
								</Glyphicon>
								<Glyphicon 
									glyph='comment' 
									className='comment-icon'
									onClick={this.showComments.bind(this, comments)}>
									<span className='comments'>{comments.length}</span></Glyphicon>
							</div>
						</CarouselItem>)
				})}
		  </Carousel>
		)
	}
})

export default CarouselModal;