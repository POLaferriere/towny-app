import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import store from './store';

import App from './components/app';
import Index from './components/index';
import Login from './components/login';
import Logout from './components/logout';
import Signup from './components/signup';
import User from './components/user';
import Trivia from './components/trivia';
import Town from './components/town';
import Landing from './components/landing';
import Pictures from './components/pictures';
import Events from './components/events';
import EventPage from './components/event-page';
import NoTown from './components/no-town';
import CreateTown from './components/create-town';

ReactDOM.render((
	<Router>
		<Route path='/' component={App} >
			<Route path='/login' component={Login} />
			<Route path='/logout' component={Logout} />
			<Route path='/signup' component={Signup} />
			<Route path='/user' component={User} />
			<Route path='/noTown/:id' component={NoTown} />
			<Route path='/create' component={CreateTown} />
			<Route path='/town/:id' component={Town}>
				<Route path='landing' component={Landing} />
				<Route path='trivia' component={Trivia} />
				<Route path='events' component={Events} />
				<Route path='events/:eventId' component={EventPage}/>
				<Route path='pictures' component={Pictures} />
			</Route>
		</Route>
	</Router>
), document.getElementById('application'));
