import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import store from './store'

import App from './components/app';
import Index from './components/index';
import Login from './components/login';
import Logout from './components/logout';
import Signup from './components/signup';
import User from './components/user';
import Trivia from './components/trivia';
import AddTrivia from './components/add-trivia'
import TriviaModal from './components/trivia-modal'
import TriviaLocation from './components/trivia-location'
import Town from './components/town'

ReactDOM.render((
	<Router>
		<Route path='/' component={App} >
			<Route path='/login' component={Login} />
			<Route path='/logout' component={Logout} />
			<Route path='/signup' component={Signup} />
			<Route path='/user' component={User} />
			<Route path='/town' component={Town}>
				<Route path='trivia' component={Trivia} >
					<Route path='modal' component={TriviaModal} />
					<Route path='location' component={TriviaLocation} />
					<Route path='new' component={AddTrivia} />
					<Route path='new/:id' component={AddTrivia} />
				</Route>
			</Route>
		</Route>
	</Router>
), document.getElementById('application'));
