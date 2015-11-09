import React from 'react';
import {Carousel, CarouselItem, Glyphicon, Modal, ButtonGroup, Button} from 'react-bootstrap';
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
			showModal: false,
		}
	},

	handleSelect(index, dir) {
		this.setState({
			index: index,
			direction: dir,
		})
		this.props.onSlide();
	},	

	handleDelete(picture) {
		this.setState({
			showModal: true,
		})
		// let pictures = store.getPictureCollection(session.getTownId());
		
		// picture.destroy().then(() => {
		// 	pictures.fetch().then(() => {
		// 		this.setState({
		// 			index: this.state.index+1
		// 		})
		// 	})
		// })
	},

	close() {
		this.setState({
			showModal: false,
		})
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
						<CarouselItem className='carousel-modal-image modal-container'>
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
							{picture.get('creator').objectId == session.getUserId() && 
								<Glyphicon glyph='trash' className='carousel-modal-delete' onClick={this.handleDelete.bind(this, picture)}/>}

							<Modal
								show={this.state.showModal}
								onHide={this.close}
								container={this}
								className='warning-modal'>
								<Modal.Body>
									<h1>Are you sure you want to delete this picture?</h1>
									<div className="warning-modal-buttons">
										<ButtonGroup bsSize='lg'>
											<Button bsStyle='danger'>Delete</Button>
											<Button>Go Back</Button>
										</ButtonGroup>
									</div>
								</Modal.Body>

							</Modal>
						</CarouselItem>)
				})}
		  </Carousel>
		)
	}
})

export default CarouselModal;