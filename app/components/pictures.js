import React from 'react';
import filepicker from 'filepicker-js';
import store from '../store';
import {Glyphicon, Modal, Button} from 'react-bootstrap';
import masonry from 'react-masonry-component';
import CarouselModal from './carousel-modal';

let Masonry = masonry(React);


const Pictures = React.createClass({
	getInitialState() {
		return {
			showModal: false,
			showCarousel: false,
			loadingImage: '',
			modalInput: '',
			clickedImage: null,
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
			town: {objectId: townId}
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
							<div className='picture-container' onClick={this.startCarousel.bind(this, i)} >
								<img src={picture.get('url')} key={picture.get('objectId')}/>
								<div className="picture-container-stats">
									<Glyphicon 
										glyph='thumbs-up' 
										className='like-icon'>
										<span className='likes'>{picture.get('likes')}</span>
									</Glyphicon>
									<Glyphicon glyph='comment' className='comment-icon'/>
								</div>
							</div>
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
						<CarouselModal startingIndex={this.state.clickedImage}/>
					</Modal.Body>
				</Modal>

			</div>
		)
	}
});

export default Pictures;