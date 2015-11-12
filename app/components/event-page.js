import React from 'react';
import store from '../store';
import moment from 'moment';
import {Glyphicon, Button, OverlayTrigger, Tooltip} from 'react-bootstrap';
import {History} from 'react-router';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
import $ from 'jquery';
import _ from 'underscore';

momentLocalizer(moment);

const likeTooltip = (<Tooltip>You must be logged in to like</Tooltip>);


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
			comments: store.getEventComments(this.props.params.eventId),
			seeComments: false,
			commentInput: ''
		}
	},

	componentWillMount() {
		this.state.comments.fetch().then(() => {
			this.setState({
				comments: this.state.comments,
			})
		})
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

	seeComments() {
		this.setState({
			seeComments: true,
		})
	},

	like(event) {
		let collection = store.getEventsCollection(session.getTownId());
		let likes = _.map(event.get('likes'), (like) =>{
			return JSON.parse(like)
		});
		if(!_.any(likes, (like) => {
			return like.objectId == session.getUserId()
		})) {
			event.get('likes').push(JSON.stringify({	
				__type: "Pointer",
				class: "User",
				objectId: session.getUserId(),
			}))
			collection.set(event);
			collection.sync('update', event).then(() => this.forceUpdate());
		}
	},

	handleCommentChange(e) {
		this.setState({
			commentInput: e.target.value,
		})
	},

	submitComment(event, e) {
		e.preventDefault();	
		store.commentOnEvent(event.objectId, this.state.commentInput);
		this.state.comments.fetch().then(() => {
			this.setState({
				comments: this.state.comments,
				commentInput: '',
			})
		})
	},

	render() {
		let event = this.state.event.toJSON();
		let comments = this.state.comments;
		let commentLength = this.state.comments.length
		let likesArray = _.map(event.likes, (like) =>{
			return JSON.parse(like)
		});

		console.log(comments);

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
				<div className="event-page-footer">
					<p className="event-page-back" onClick={this.goBack}>
						<Glyphicon glyph='arrow-left' className='event-page-backarrow' />
						Go back to events
					</p>
					{!session.hasUser() && <OverlayTrigger placement='bottom' overlay={likeTooltip}>
						<Glyphicon 
							glyph='thumbs-up' 
							className='event-page-footer-likes'>
							<span className='likes'>{event.likes.length}</span>
						</Glyphicon>
					</OverlayTrigger>}
					{session.hasUser() && 
						<Glyphicon 
							glyph='thumbs-up' 
							className={'event-page-footer-likes ' + (_.any(likesArray, (like) => {return like.objectId == session.getUserId()}) && 'liked')} 
							onClick={this.like.bind(this, this.state.event)}>
							<span className='likes'>{event.likes.length}</span>
						</Glyphicon>}
						<Glyphicon 
						glyph='comment' 
						className='event-page-footer-comments' 
						onClick={this.seeComments}>
						<span className='comment-length'>{commentLength}</span>
					</Glyphicon>
				</div>
				{this.state.seeComments &&
					<ul className="event-page-comments">
						{comments.map((comment) => {
							return (
								<li>
									<p className="event-page-comment">{comment.get('text')}</p>
									<div className="event-page-comment-user-time">
										<p className="event-page-comment-time">{moment(comment.get('createdAt')).fromNow()}</p>
										<p className="event-page-comment-user">{'by ' + comment.get('comment_by').username}</p>
									</div>
								</li>)
						})}
						{session.hasUser() && 
							<form className='event-comment-form' onSubmit={this.submitComment.bind(this, event)}>
								<input 
									type="text" 
									className='event-comment-input' 
									placeholder='Comment on this event'
									value={this.state.commentInput}
									onChange={this.handleCommentChange}/>
							</form>}
					</ul>}
			</div>
		)
	}
});

export default EventPage;