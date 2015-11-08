import React from 'react';
import moment from 'moment';
import {History} from 'react-router';

const EventContainer = React.createClass({
	propTypes: {
		event: React.PropTypes.object.isRequired,
		upcoming: React.PropTypes.bool.isRequired,
	},

	mixins: [History],

	goToEvent() {
		this.history.pushState({}, '/town/' + session.getTownId() + '/events/' + this.props.event.get('objectId'));
	},

	render() {
		let event = this.props.event.toJSON();

		return (
			<div className="event-container" onClick={this.goToEvent}>
				<h1 className="event-container-title">{event.title}</h1>
				{this.props.upcoming && <p>{moment(event.date.iso).format('MMM Do [at] h:mm A')}</p>}
				{!this.props.upcoming && <p>{moment(event.date.iso).format('h:mm A')}</p>}
			</div>
		)
	}
})

export default EventContainer;