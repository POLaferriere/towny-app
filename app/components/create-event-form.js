import React from 'react';
import Moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import {Button} from 'react-bootstrap';
import store from '../store';

momentLocalizer(Moment);

const CreateEventForm = React.createClass({
	propTypes: {
		onSubmit: React.PropTypes.func,
		date: React.PropTypes.object,
	},

	getInitialState() {
			return {
				title: '',
				description: '',
				url: '',
				date: this.props.date || new Date(),
			}
	},

	handleChange(state, e) {
		this.setState({
			[state]: e.target.value,
		})
	},

	handleDateChange(date, string) {
		this.setState({
			date: date,
		})
	},

	handleSubmit(e) {
		e.preventDefault();
		let event = {
			title: this.state.title,
			description: this.state.description,
			url: this.state.url,
			date: Moment(this.state.date).toISOString(),
		}
		store.newEvent(session.getTownId(), session.getUserId(), event)
		this.props.onSubmit();
		
	},

	render() {
		return (
			<form className='create-event-form' onSubmit={this.handleSubmit}>
				<input 
					className='event-input-title' 
					type="text" 
					placeholder='Event Title' 
					value={this.state.title}
					onChange={this.handleChange.bind(this, 'title')}/>
				<textarea 
					className='event-input-description' 
					rows='8'
					placeholder='Include a description of your event'
					value={this.state.description}
					onChange={this.handleChange.bind(this, 'description')}>
				</textarea>
				<input 
					className='event-input-url' 
					type="text" 
					placeholder='Event URL (optional)' 
					value={this.state.url}
					onChange={this.handleChange.bind(this, 'url')}/>
				<DateTimePicker 
					value={this.state.date}
					onChange={this.handleDateChange}
					parse={str => new Date(str)}	/>
				<Button className='event-input-submit' type="submit" onSubmit={this.handleSubmit}>Create Event</Button>
			</form>
		)
	}
});

export default CreateEventForm;