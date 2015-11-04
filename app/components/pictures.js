import React from 'react';
import filepicker from 'filepicker-js';
import store from '../store';

const Pictures = React.createClass({
	componentWillMount() {
		let pictures = store.getPictureCollection(session.getTownId());
		pictures.fetch().then(() => {this.forceUpdate()});
	},

	handleAdd() {
		filepicker.setKey('ApbFEe9SIQimm36czGHxwz');

		filepicker.pick(
			function(Blob) {
				console.log(Blob.url);
			}
		)
	},

	render() {
		let pictures = store.getPictureCollection(session.getTownId());

		return (
			<div>
				<h1>Pictures</h1>
				<button onClick={this.handleAdd}>add a picture</button>
				{pictures.map((picture) => {
					return <img src={picture.get('url')} key={picture.get('objectId')}/>
				})}
			</div>
		)
	}
});

export default Pictures;