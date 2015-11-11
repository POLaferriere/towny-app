import React from 'react';

const AddPictureComment = React.createClass({
	propTypes: {
		onSubmit: React.PropTypes.func,
	},
	
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

	handleSubmit(e){
		e.preventDefault();
		this.props.onSubmit(this.state.input);
		this.setState({
			input: ''
		});
	},

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<input 
					onSelect={this.handleSelect} 
					className='add-picture-input' 
					type="text" 
					placeholder='Comment on this picture' 
					value={this.state.input} 
					onChange={this.handleInput}/>
			</form>
		)
	}
})

export default AddPictureComment;