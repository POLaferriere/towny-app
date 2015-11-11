import React from 'react';
import store from '../store';
import moment from 'moment';
import {Glyphicon, Button} from 'react-bootstrap';
import {History} from 'react-router';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
import $ from 'jquery';

momentLocalizer(moment);


const EventPage = React.createClass({
	getInitialState() {

		return {
			event: store.getEvent(session.getTownId(), this.props.params.eventId),
			editTitle: false,
			editDate: false,
			title: '',
			date: null,
			description: '',
			url: '',
		}
	},

	mixins: [History],

	goBack() {
		this.history.goBack();
	},

	closeEdits() {
		this.setState({
			editTitle: false,
			editDate: false,
			editDescription: false,
			editURL: false,
		})
	},

	focusInput() {
		$('.event-page-edit-input').focus();
	},

	editTitle(title) {
		this.closeEdits();
		this.setState({
			editTitle: true,
			title: title,
		})
		this.focusInput();
	},

	editDate(date) {
		this.closeEdits();
		this.setState({
			editDate: true,
			date: moment(date).toDate(),
		})
	},

	editDescription(description) {
		this.closeEdits();
		this.setState({
			editDescription: true,
			description: description,
		})
		this.focusInput();
	},

	editURL(url) {
		this.closeEdits();
		this.setState({
			editURL: true,
			url: url,
		})
		this.focusInput();
	},

	handleEdit(changed, e) {
		this.setState({
			[changed]: e.target.value
		})
	},

	handleEditDate(date) {
		let event = this.state.event;
		event.save({
			date: {"__type": "Date", "iso": moment(date).toISOString()},
		}).then(() => {
			event.fetch().then(() => {
				this.setState({
					date: date,
					event: event,
					editDate: false,
				})
			})
		})
	},

	handleSubmit(changed, e) {
		e.preventDefault();
		let event = this.state.event
		event.save({
			[changed]: this.state[changed]
		}).then(() => {
			event.fetch().then(() => {
				this.setState({
					event: event,
					editTitle: false, 
					editDescription: false,
					editURL: false,
				})
			})
		})
	},

	render() {
		let event = this.state.event.toJSON();

		return(
			<div className='event-page'>
				{!this.state.editTitle && 
					<h1 className='event-page-title'>
						{event.title}
						{event.creator.objectId == (session.hasUser() && session.getUserId()) &&
						<Glyphicon glyph='pencil' className='event-page-edit title' onClick={this.editTitle.bind(this, event.title)} />}
					</h1>}
				{this.state.editTitle &&
					<form onSubmit={this.handleSubmit.bind(this, 'title')}>
						<input 
							className='event-page-edit-input' 
							type="text" 
							value={this.state.title} 
							onChange={this.handleEdit.bind(this, 'title')}/>
					</form>}
				{!this.state.editDate && <p className='event-page-date'>
					{moment(event.date.iso).format('MMM Do [at] h:mm A')}
					{event.creator.objectId == (session.hasUser() && session.getUserId()) &&
					<Glyphicon glyph='pencil' className='event-page-edit' onClick={this.editDate.bind(this, event.date)}/>}
				</p>}
				{this.state.editDate &&
					<DateTimePicker 
						value={this.state.date}
						onSelect={this.handleEditDate}
						parse={str => new Date(str)}	/>}
				<hr/>
				<div className="event-page-body">
					{!this.state.editDescription && 
						<div>
							<p className='event-page-description'>
								{event.description}
							</p>
							{event.creator.objectId == (session.hasUser() && session.getUserId()) &&
								<p className='event-page-paragraph-edit' onClick={this.editDescription.bind(this, event.description)}>Edit</p>}
						</div>}
					{this.state.editDescription && 
						<form onSubmit={this.handleSubmit.bind(this, 'description')}>
							<textarea 
								className='event-page-edit-input' 
								rows="8" 
								cols="60" 
								value={this.state.description} 
								onChange={this.handleEdit.bind(this, 'description')}>
							</textarea>
							<Button 
								onClick={this.handleSubmit.bind(this, 'description')} 
								className='event-page-edit-description-submit edit-description' 
								bsStyle='primary'>
								Submit
							</Button>
						</form>}
					{!this.state.editURL && <p className='event-page-url'>
						{'Link:  ' + event.url}
						{event.creator.objectId == (session.hasUser() && session.getUserId()) &&
						<Glyphicon glyph='pencil' className='event-page-edit' onClick={this.editURL.bind(this, event.url)}/>}
					</p>}
					{this.state.editURL &&
						<form onSubmit={this.handleSubmit.bind(this, 'url')}>
							<input 
								className='event-page-edit-input' 
								type="text" 
								value={this.state.url} 
								onChange={this.handleEdit.bind(this, 'url')}/>
						</form>}
				</div>
				<p className="event-page-back" onClick={this.goBack}>
					<Glyphicon glyph='arrow-left' className='event-page-backarrow' />
					Go back to events
				</p>
			</div>
		)
	}
});

export default EventPage;