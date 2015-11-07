import React from 'react';
import {Button} from 'react-bootstrap';
import {History} from 'react-router';

const NoTown = React.createClass({
	mixins: [History],

	goToCreate() {
		this.history.pushState({}, '/create')
	},

	render() {
		console.log(this.props)
		return (
			<div className='no-town-container'>
				<img src={require("../assets/house.png")} alt=""/>
				<h1>{"We can't seem to find " + this.props.params.id}</h1>
				<Button bsSize='large' onClick={this.goToCreate}>Create a new Town</Button>
			</div>
			)
	}
});

export default NoTown;