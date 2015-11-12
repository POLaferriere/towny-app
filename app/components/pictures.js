import React from 'react';
import filepicker from 'filepicker-js';
import store from '../store';
import {Glyphicon, Modal, Button, Tooltip, OverlayTrigger} from 'react-bootstrap';
import masonry from 'react-masonry-component';
import CarouselModal from './carousel-modal';
import Picture from './picture';
import AddPictureComment from './add-picture-comment'
import Login from './login';
import moment from 'moment';


let Masonry = masonry(React);

const commentTooltip = (<Tooltip>You must be logged in to comment</Tooltip>);

const Pictures = React.createClass({
	getInitialState() {
		return {
			showModal: false,
			showCarousel: false,
			loadingImage: '',
			modalInput: '',
			clickedImage: 0,
			showComments: false,
			logIn: false,
			commenting: false,
			pictures: store.getPictureCollection(session.getTownId())
		}
	},

	componentWillMount() {
		this.state.pictures.fetch().then(() => {this.forceUpdate()});
	},

	handleAdd() {
		let url;
		let _this = this;
		if(session.hasUser()) {
			filepicker.setKey('ApbFEe9SIQimm36czGHxwz');

			filepicker.pick(
				function(Blob) {
					_this.setState({
						showModal: true,
						loadingImage: Blob.url
					})
				}
			)
		} else {
			this.setState({
				logIn: true,
			});
		}
	},

	close() {
		this.setState({
			logIn: false,
		})
	},

	closeCarousel() {
		this.setState({
			showCarousel: false,
		})
	},

	handleInput(e) {
		this.setState({
			modalInput: e.target.value
		})
	},

	handleSubmit(e) {
		let townId = session.getTownId()
		e.preventDefault();

		this.state.pictures.create({
			url: this.state.loadingImage,
			caption: this.state.modalInput,
			town: {objectId: townId},
			user: {objectId: session.getUserId()}
		})

		this.state.pictures.fetch().then(() => {
			this.setState({
				showModal: false,
				loadingImage: '',
				modalInput: '',
				pictures: this.state.pictures,
			})
		})
	},

	startCarousel(i) {
		
		this.setState({
			clickedImage: i,
			showCarousel: true,
		})
	},

	showComments(comments) {
		console.log(comments);
		this.setState({
			showComments: !this.state.showComments,
			comments: comments
		})
	},

	onCommentSubmit(comment) {
		store.commentOnPicture(this.state.comments.pictureId, comment);
		this.setState({
			commenting: false,
		})
	},

	closeComments() {
		this.showComments ? this.setState({showComments: false, commenting: false}) : null
	},

	onLogin() {
		this.setState({
			logIn: false,
		})
		this.props.onSubmit();
	},

	comment() {
		this.setState({
			commenting: true,
		})
	},

	render() {
		let pictures = this.state.pictures;
		let options = {
			columnWidth: 200,
		}

		return (
			<div className='pictures-container'>
				<Masonry 
					options={{
						gutter: 10
					}}>
					{pictures.map((picture, i) => {
						return (
							<Picture key={picture.get('objectId')} picture={picture} startCarousel={this.startCarousel} i={i}/>
						)
					})}
				</Masonry>
				
				<Glyphicon glyph='plus-sign' className='pictures-add' onClick={this.handleAdd} />

				<Modal show={this.state.showModal} backdrop='static' onHide={this.close}>
					<Modal.Body>
						<img className='modal-image' src={this.state.loadingImage} />
						<form onSubmit={this.handleSubmit}>
							<input 
								className='modal-input' 
								type="text" 
								value={this.state.modalInput} 
								onChange={this.handleInput} 
								placeholder='Add a description'/>
							<Button 
								className='modal-submit' 
								bsStyle='primary' 
								bsSize='large' 
								onClick={this.handleSubmit}>
								Submit
							</Button>
						</form>
					</Modal.Body>
				</Modal>

				<Modal show={this.state.showCarousel} onHide={this.closeCarousel} className='carousel-modal'>
					<Modal.Body>
						<CarouselModal startingIndex={this.state.clickedImage} showComments={this.showComments} onSlide={this.closeComments}/>
					</Modal.Body>
					<Modal.Footer>
						{this.state.showComments && <div className="carousel-modal-comments">
								{this.state.comments.map((comment) => {
									return (
										<div>
											<p className='carousel-modal-comment'>{comment.get('text')}</p>
											<div className="carousel-modal-comment-user-time">
												<p className="carousel-modal-comment-time">{moment(comment.get('createdAt')).fromNow()}</p>
												<p className="carousel-modal-comment-user">{'by ' + comment.get('comment_by').username}</p>
											</div>
										</div>
										)
								})}
								

								
								{session.hasUser() &&
									(!this.state.commenting && <p className='carousel-modal-click' onClick={this.comment}>What do you think?</p>)}
								{!session.hasUser() &&
									(!this.state.commenting && 
										<OverlayTrigger placement='bottom' overlay={commentTooltip}>
											<p className='carousel-modal-click'>What do you think?</p>
										</OverlayTrigger>)}	
								{this.state.commenting && <AddPictureComment onSubmit={this.onCommentSubmit} />}
							</div>}
					</Modal.Footer>
				</Modal>

				<Modal show={this.state.logIn} onHide={this.close} className='login-modal'>
					<Modal.Body modalClassName='login-modal-body'>
						<Login onLogin={this.onLogin}/>
					</Modal.Body>
				</Modal>

			</div>
		)
	}
});

export default Pictures;