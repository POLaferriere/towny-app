import React from 'react';
import filepicker from 'filepicker-js';
import store from '../store';
import {Glyphicon, Modal, Button} from 'react-bootstrap';


const Pictures = React.createClass({
	getInitialState() {
		return {
			showModal: false,
			loadingImage: '',
			modalInput: '',
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

	render() {
		let pictures = store.getPictureCollection(session.getTownId());
		let options = {
			columnWidth: 200,
		}

		return (
			<div className='pictures-container'>	
				{pictures.map((picture) => {
					return (
						<div className='picture-container'>
							<img src={picture.get('url')} key={picture.get('objectId')}/>
							<h1>{picture.get('caption')}</h1>
						</div>
					)
				})}
				
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

			</div>
		)
	}
});

export default Pictures;