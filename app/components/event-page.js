import React from 'react';
import store from '../store';
import moment from 'moment';
import {Glyphicon} from 'react-bootstrap';
import {History} from 'react-router';

const EventPage = React.createClass({
	mixins: [History],

	goBack() {
		this.history.goBack();
	},

	render() {
		let event = store.getEvent(session.getTownId(), this.props.params.eventId).toJSON();

		return(
			<div className='event-page'>
				<h1 className='event-page-title'>{event.title}</h1>
				<p className='event-page-date'>{moment(event.date.iso).format('MMM Do [at] h:mm A')}</p>
				<hr/>
				<p className='event-page-description'>{event.description}</p>
				<p className='event-page-url'>{event.url}</p>
				<p className="event-page-back" onClick={this.goBack}>
					<Glyphicon glyph='arrow-left' className='event-page-backarrow' />
					Go back to events
				</p>
			</div>
		)
	}
});

export default EventPage;