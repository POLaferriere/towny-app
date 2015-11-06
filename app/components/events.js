import React from 'react';
import Moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import {Glyphicon, Modal} from 'react-bootstrap';
import CreateEventForm from './create-event-form';
import store from '../store';	
import _ from 'underscore';

momentLocalizer(Moment);

const Events = React.createClass ({
	getInitialState() {
		return {
			datePicked: false,
			date: null,
			modal: false,
			events: [],
		}
	},

	componentWillMount() {
		let events = store.getEventsCollection(session.getTownId());
		events.fetch().then(() => {
			let upcoming = events.filter((event) => {
				return Date.parse(event.get('date').iso) >= Date.now()
			})
			this.setState({
				events: upcoming,
			})
		})
	},
	
	handleSelect(date) {
		this.setState({
			datePicked: true,
			date: date, 
		})
	},

	handleAdd() {
		this.setState({
			modal: true,
		})
	},



	close() {
		this.setState({
			modal: false,
		})
	},

	render() {
		let events = this.state.events ;

		return (
			<div className="events-container">
				<DateTimePicker 
					className='date-picker'
					time={false} 
					format={'dddd, MMMM Do YYYY'}
					onSelect={this.handleSelect}/>

				{!this.state.datePicked && 
					<div className="upcoming-events">
						<h1>Upcoming events</h1>
						{_.map(this.state.events, (event) => {
							return <h1>{event.get('title')}</h1>
						})}
					</div>}

				{this.state.datePicked &&
					<div className="event-container">
						<h1>{Moment(this.state.date).format('dddd, MMMM do YYYY')}</h1>
					</div>}

				{this.state.modal && 
					<Modal show={this.state.modal}>
						<Modal.Header closeButton onHide={this.close}>
							<h1>Create an event</h1>
						</Modal.Header>
						<Modal.Body>
							<CreateEventForm onSubmit={this.close}/>
						</Modal.Body>
					</Modal>}

				<Glyphicon glyph='plus-sign' className='events-add' onClick={this.handleAdd} />

			</div>
			)
	}
})

export default Events;