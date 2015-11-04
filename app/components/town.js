import React from 'react';
import {Nav, NavItem} from 'react-bootstrap';
import {History} from 'react-router';
import store from '../store';

const Town = React.createClass({

	mixins: [History],

	moveTo(e) {
		e.preventDefault();
		let loc = e.target.text;
		this.history.pushState({}, `/town/${session.getTownId()}/${loc}`)
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
				    <NavItem eventKey={1} onClick={this.moveTo}>Trivia</NavItem>
				    <NavItem eventKey={2} onClick={this.moveTo}>Pictures</NavItem>
				    <NavItem eventKey={3} onClick={this.moveTo}>Events</NavItem>
				  </Nav>
				</div>

				{this.props.children}
			</div>
		)
	}
})

export default Town;