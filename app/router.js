import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';

import App from './components/app';
import Index from './components/index';
import Trivia from './components/trivia';
import AddTrivia from './components/add-trivia'
import TriviaModal from './components/trivia-modal'
import TriviaLocation from './components/trivia-location'

ReactDOM.render((
	<Router>
		<Route path='/' component={App}>
			<IndexRoute component={Index}/>
			<Route path='/trivia' component={Trivia}>
				<Route path='modal' component={TriviaModal}/>
				<Route path='location' component={TriviaLocation}/>
				<Route path='new' component={AddTrivia}/>
				<Route path='new/:id' component={AddTrivia}/>
			</Route>
		</Route>
	</Router>
), document.getElementById('application'));
