import React from 'react';
import {Nav, NavItem} from 'react-bootstrap';
import {History} from 'react-router';

const Town = React.createClass({
	mixins: [History],

	moveToTrivia(e) {
		e.preventDefault();
		this.history.pushState({}, `${this.props.route.path}/trivia`)
	},

	render() {
		return (
			<div className='town-container'>
				<div className="town-header">
					<h1 className="town-header-name">Town Name</h1>
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