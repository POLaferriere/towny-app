import React from 'react';
import store from '../store'
import _ from 'underscore'
import { History } from 'react-router';
import TriviaQuote from './trivia-quote';
import {Glyphicon, Modal} from 'react-bootstrap';
import AddTrivia from './add-trivia'
import Login from './login'

const Trivia = React.createClass({
	propTypes: {
		onSubmit: React.PropTypes.func,
	},

	mixins: [History],

	getInitialState() {
		return {
			triviaQuotes: [],
			addingTrivia: false,
			logIn: false,
			trivia: store.getTriviaCollection(session.getTownId())
		}
	},

	componentWillMount() {
		this.state.trivia.fetch().then(() => {this.forceUpdate()});
	},

	handleAdd(e) {
		e.preventDefault();
		if(session.hasUser()) {
			this.setState({
				addingTrivia: true,
			})
		} else {
			this.setState({
				logIn: true,
			});
		}
	},

//TODO make new posts go to the top
	onChange() {
		this.state.trivia.fetch().then(() =>{
			this.setState({
				trivia: this.state.trivia,
				addingTrivia: false,
			})
		})
	},

	close() {
		this.setState({
			addingTrivia: false,
			logIn: false,
		})
	},

	onLogin() {
		this.setState({
			logIn: false,
		})
		this.props.onSubmit();
	},

	render() {
		let triviaQuotes = this.state.trivia.sortBy('likes').reverse() || {};

		return (
			<div className='trivia-container'>

				<Modal show={this.state.addingTrivia} onHide={this.close} className='trivia-container-modal'>
					<Modal.Body modalClassName='trivia-add-modal'>
						<AddTrivia onSubmit={this.handleSubmit} onSubmit={this.onChange} />
					</Modal.Body>
				</Modal>

				<Modal show={this.state.logIn} onHide={this.close} className='login-modal'>
					<Modal.Body modalClassName='login-modal-body'>
						<Login onLogin={this.onLogin}/>
					</Modal.Body>
				</Modal>

				<ul>
					{triviaQuotes.map((quote) => {
						return (<TriviaQuote key={quote.get('id')} model={quote} onChange={this.onChange}/>)
					})}
				</ul>
				<Glyphicon glyph='plus-sign' className='trivia-add' onClick={this.handleAdd} />
			</div>
		);
	}
})

export default Trivia;
