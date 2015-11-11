import React from 'react';
import {Carousel, CarouselItem, Glyphicon, Modal, ButtonGroup, Button, Tooltip, OverlayTrigger,} from 'react-bootstrap';
import store from '../store';
import _ from 'underscore';

const likeTooltip = (<Tooltip>You must be logged in to like</Tooltip>);

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
	},

	close() {
		this.setState({
			showModal: false,
		})
	},

	like(picture) {
		let collection = store.getPictureCollection(session.getTownId());
		let likes = _.map(picture.get('likes'), (like) =>{
			return JSON.parse(like)
		});
		if(!_.any(likes, (like) => {
			return like.objectId == session.getUserId()
		})) {
			picture.get('likes').push(JSON.stringify({	
				__type: "Pointer",
				class: "User",
				objectId: session.getUserId(),
			}))
			picture.save().then(() => this.forceUpdate());
		}
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
					let likesArray = _.map(picture.get('likes'), (like) => {
						return JSON.parse(like)
					});

					return (
						<CarouselItem className='carousel-modal-image modal-container'>
							<img width={900} src={picture.get('url')} />
							<p className="carousel-modal-caption">{picture.get('caption')}</p>
							<div className="carousel-modal-stats">
								{session.hasUser() && 
									<Glyphicon 
										glyph='thumbs-up' 
										className={'like-icon ' + (_.any(likesArray, (like) => {return like.objectId == session.getUserId()}) && 'liked')}
										onClick={this.like.bind(this, picture)}>
										<span className='likes'>{likesArray.length}</span>
									</Glyphicon>}
								{!session.hasUser() &&
									<OverlayTrigger placement='bottom' overlay={likeTooltip}>
										<Glyphicon 
											glyph='thumbs-up' 
											className='like-icon'>
											<span className='likes'>{likesArray.length}</span>
										</Glyphicon>
									</OverlayTrigger>}
								<Glyphicon 
									glyph='comment' 
									className='comment-icon'
									onClick={this.showComments.bind(this, comments)}>
									<span className='comments'>{comments.length}</span></Glyphicon>
							</div>
							{picture.get('creator').objectId == (session.hasUser() && session.getUserId()) && 
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