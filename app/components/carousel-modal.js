import React from 'react';
import {Carousel, CarouselItem, Glyphicon, Panel} from 'react-bootstrap';
import store from '../store';
import AddPictureComment from './add-picture-comment'

const CarouselModal = React.createClass({
	propTypes: {
		startingIndex: React.PropTypes.number.isRequired,
	},

	getInitialState() {
		return {
			index: this.props.startingIndex,
			direction: null,
			showComments: false,
			commenting: false,
		}
	},

	handleSelect(index, dir) {
		this.setState({
			index: index,
			direction: dir,
		})
	},	

	like(picture) {
		picture.set('likes', picture.get('likes')+1);
		picture.save().then(() => {this.forceUpdate()});
	},

	showComments() {
		this.setState({
			showComments: !this.state.showComments,
		})
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
									onClick={this.showComments}>
									<span className='comments'>{comments.length}</span></Glyphicon>
							</div>
							<Panel collapsible expanded={this.state.showComments} className="carousel-modal-comments">
								{comments.length == 0 && 
									<AddPictureComment/>}
								{comments.length !=0 &&comments.map((comment) => {
									return <p>{comment.get('text')}</p>
								})}
								{this.state.commenting && <AddPictureComment/>}
							</Panel>
						</CarouselItem>)
				})}
		  </Carousel>
		)
	}
})

export default CarouselModal;