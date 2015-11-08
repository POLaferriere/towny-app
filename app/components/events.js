import React from 'react';
import Moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import {Glyphicon, Modal} from 'react-bootstrap';
import CreateEventForm from './create-event-form';
import EventContainer from './event-container';
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
			upcoming = _.sortBy(upcoming, (event) => {return event.get('date').iso})
			this.setState({
				events: upcoming,
			})
		})
	},
	
	handleSelect(date) {
		let events = store.getEventsCollection(session.getTownId());
		let selected = events.filter((event) => {
			return Moment(event.get('date').iso).format('dddd, MMMM do YYYY') === Moment(date).format('dddd, MMMM do YYYY')
		})
		selected = _.sortBy(selected, (event) => {return event.get('date').iso})
		this.setState({
			datePicked: true,
			date: date, 
			events: selected,
		})
	},

	handleAdd() {
		this.setState({
			modal: true,
		})
	},



	close() {
		let events = store.getEventsCollection(session.getTownId());
		if(!this.state.datePicked) {
			let upcoming = events.filter((event) => {
				return Date.parse(event.get('date').iso) >= Date.now()
			})
			upcoming = _.sortBy(upcoming, (event) => {return event.get('date').iso})
			this.setState({
				events: upcoming,
				modal: false,
			})
		}
		if(this.state.datePicked) {
			let selected = events.filter((event) => {
				return Moment(event.get('date').iso).format('dddd, MMMM do YYYY') === Moment(this.state.date).format('dddd, MMMM do YYYY')
			})
			selected = _.sortBy(selected, (event) => {return event.get('date').iso})
			this.setState({
				modal: false,
				events: selected,
			})
		}
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
					<div>
						<h1>Upcoming events</h1>
						{_.map(this.state.events, (event) => {
							return <EventContainer event={event} key={event.get('objectId')} upcoming={!this.state.datePicked}/>
						})}
					</div>}

				{this.state.datePicked &&
					<div>
						<h1>{Moment(this.state.date).format('dddd, MMMM Do YYYY')}</h1>
						{_.map(this.state.events, (event) => {
							return <EventContainer event={event} key={event.get('objectId')} upcoming={!this.state.datePicked}/>
						})}
					</div>}

				{this.state.modal && 
					<Modal show={this.state.modal}>
						<Modal.Header closeButton onHide={this.close}>
							<h1>Create an event</h1>
						</Modal.Header>
						<Modal.Body>
							<CreateEventForm date={this.state.date} onSubmit={this.close}/>
						</Modal.Body>
					</Modal>}

				<Glyphicon glyph='plus-sign' className='events-add' onClick={this.handleAdd} />

			</div>
			)
	}
})

export default Events;