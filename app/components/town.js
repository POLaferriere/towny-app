import React from 'react';
import {Nav, NavItem, Glyphicon} from 'react-bootstrap';
import {History} from 'react-router';
import store from '../store';
import $ from 'jquery';

const Town = React.createClass({

	getInitialState() {
		return {
			hometown: session.hasUser() && session.getUser().get('hometown').objectId
		}
	},

	mixins: [History],

	moveTo(loc, e) {
		e.preventDefault();
		this.history.pushState({}, `/town/${session.getTownId()}/${loc}`)
	},

	makeHometown(id) {
		let _this = this;
		session.setHometown(id).then(() => {
			session.getUser().fetch().then(() => {
				_this.setState({
					hometown: session.getUser().get('hometown').objectId
				})
			})
		});
	},

	handleAddBanner() {
		let _this = this;
		filepicker.setKey('ApbFEe9SIQimm36czGHxwz');

		filepicker.pick(
			{
				cropRatio: 5/1,
			},
			function(Blob) {
				$.ajax({
					url:'https://api.parse.com/1/classes/Town/' + session.getTownId(),
					method: 'PUT',
					data: JSON.stringify({
						banner: Blob.url,
					})
				}).then(() => {store.getTownCollection().fetch().then(() => {_this.forceUpdate()})})
			}
		)
	},

	render() {
		let town = store.getTown(this.props.params.id).toJSON();
		var userHometown = this.state.hometown;
		let headerStyle = {backgroundImage: 'url(' + town.banner + ')'}


		return (
			<div className='town-container'>
				<div 
					className="town-header" 
					style={headerStyle}>
					<h1 className="town-header-name">{town.name}</h1>
					<Glyphicon glyph='pencil' className='town-header-add' onClick={this.handleAddBanner} />
					{town.objectId == userHometown && 
						<p className="town-header-hometown">This is your hometown</p>}
					{town.objectId != userHometown && 
						<p 
							className="town-header-hometown not-hometown"
							onClick={this.makeHometown.bind(this, town.objectId)}>
							Make this your hometown
						</p>}
				</div>
				<div className="side-nav">
					<Nav  bsStyle="pills" stacked>
				    <NavItem bsSize='lg' eventKey={1} onClick={this.moveTo.bind(this, 'trivia')}>Trivia</NavItem>
				    <NavItem bsSize='lg' eventKey={2} onClick={this.moveTo.bind(this, 'pictures')}>Pictures</NavItem>
				    <NavItem bsSize='lg' eventKey={3} onClick={this.moveTo.bind(this, 'events')}>Events</NavItem>
				  </Nav>
				</div>

				{this.props.children}
			</div>
		)
	}
})

export default Town;