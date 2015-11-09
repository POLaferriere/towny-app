import React from 'react';
import filepicker from 'filepicker-js';
import store from '../store';
import {Glyphicon, Modal, Button} from 'react-bootstrap';
import masonry from 'react-masonry-component';
import CarouselModal from './carousel-modal';
import Picture from './picture';
import AddPictureComment from './add-picture-comment'

let Masonry = masonry(React);


const Pictures = React.createClass({
	getInitialState() {
		return {
			showModal: false,
			showCarousel: false,
			loadingImage: '',
			modalInput: '',
			clickedImage: 0,
			showComments: false,
		}
	},

	componentWillMount() {
		let pictures = store.getPictureCollection(session.getTownId());
		pictures.fetch().then(() => {this.forceUpdate()});
	},

	handleAdd() {
		let url;
		let _this = this;

		filepicker.setKey('ApbFEe9SIQimm36czGHxwz');

		filepicker.pick(
			function(Blob) {
				_this.setState({
					showModal: true,
					loadingImage: Blob.url
				})
			}
		)
	},

	close() {},

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
		let pictures = store.getPictureCollection(townId);

		e.preventDefault();

		pictures.create({
			url: this.state.loadingImage,
			caption: this.state.modalInput,
			town: {objectId: townId},
			user: {objectId: session.getUserId()}
		})

		this.setState({
			showModal: false,
			loadingImage: '',
			modalInput: '',
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
			showComments: !this.state.showComments,
		})
	},

	closeComments() {
		this.showComments ? this.setState({showComments: false}) : null
	},

	render() {
		let pictures = store.getPictureCollection(session.getTownId());
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
								{this.state.comments.length == 0 && 
									<AddPictureComment onSubmit={this.onCommentSubmit}/>}
								{this.state.comments.length !=0 && this.state.comments.map((comment) => {
									return <p>{comment.get('text')}</p>
								})}
								{this.state.commenting && <AddPictureComment/>}
							</div>}
					</Modal.Footer>
				</Modal>

			</div>
		)
	}
});

export default Pictures;