import React from 'react';
import {Nav, NavItem} from 'react-bootstrap';
import {History} from 'react-router';
import store from '../store';

const Town = React.createClass({

	mixins: [History],

	moveToTrivia(e) {
		e.preventDefault();
		this.history.pushState({}, `${this.props.location.pathname}/trivia`)
	},

	render() {
		let town = store.getTown(this.props.params.id).toJSON();
		

		return (
			<div className='town-container'>
				<div className="town-header">
					<h1 className="town-header-name">{town.name}</h1>
				</div>
				<div className="side-nav">
					<Nav bsStyle="pills" stacked>
				    <NavItem eventKey={1} onClick={this.moveToTrivia}>Trivia</NavItem>
				    <NavItem eventKey={2} title="Item">NavItem 2 content</NavItem>
				    <NavItem eventKey={3} >NavItem 3 content</NavItem>
				  </Nav>
				</div>

				{this.props.children}
			</div>
		)
	}
})

export default Town;