import React from 'react';

const AddPictureComment = React.createClass({
	getInitialState() {
		return {
			input: '',
		}
	},

	handleSelect(e) {
		console.log('selected')
	},

	handleInput(e) {
		this.setState({
			input: e.target.value
		})
	},

	handleSubmit(){
		console.log(this.state.input)
	},

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<input onSelect={this.handleSelect}className='add-picture-input' type="text" placeholder='Comment on this picture' value={this.state.input} onChange={this.handleInput}/>
			</form>
		)
	}
})

export default AddPictureComment;