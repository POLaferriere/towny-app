import React from 'react';
import { IndexLink, Link, History } from 'react-router';
import store from '../store';
import Splash from './splash';
import {Navbar, NavBrand, NavItem, Nav, NavDropdown, MenuItem} from 'react-bootstrap'

var App = React.createClass({
  propTypes: {
    children: React.PropTypes.node
  },

  mixins: [History],

  componentDidMount() {
    this.history.pushState({}, '/town');
  },

  handleLocationSet() {
    this.forceUpdate();
  },

  handleLogout() {
    let session = store.getSession();
    localStorage.removeItem('parse-session-token');
    session.unset('currentUser');
    this.history.pushState({}, '/logout');
    this.forceUpdate();
  },

  handleLogin() {
    this.history.pushState({}, '/login');
  },

  handleSignup() {
    this.history.pushState({}, '')
  },

  handleUser(e) {
    this.history.pushState({}, '/user');
  },

  render() {
    let session = store.getSession();

    return (
      <div>
        {session.hasLocation() === false &&
          <Splash onSetLocation={this.handleLocationSet}/>}
        {session.hasLocation() && 
          (<div>
            <Navbar inverse>
              <NavBrand><a href="/town">Towny</a></NavBrand>
              <Nav right>
                <NavDropdown 
                  eventKey={3} 
                  title={session.hasUser() && store.getCurrentUser().get('username') || 'Guest'} 
                  id="basic-nav-dropdown">
                  {session.hasUser() && <MenuItem eventKey="1" onClick={this.handleUser}>User Settings</MenuItem>}
                  {!localStorage.getItem('parse-session-token') && <MenuItem eventKey="2" onClick={this.handleLogin}>Login</MenuItem>}
                  {localStorage.getItem('parse-session-token') && <MenuItem eventKey="3" onClick={this.handleLogout}>Logout</MenuItem>}
                  {!session.hasUser() && <MenuItem eventKey="4" onClick={this.handleSignup}>Sign Up</MenuItem>}
                  <MenuItem divider />
                  <MenuItem eventKey="4">Separated link</MenuItem>
                </NavDropdown>
              </Nav>
            </Navbar>
           

            {this.props.children}
          </div>)}
      </div>
  )}

});

export default App;

//  <nav className="top-bar" data-topbar role="navigation">
//   <div className="nav-container">
//     <ul className="title-area">
//       <li className="name">
//         <h1><IndexLink to="/">Towny</IndexLink></h1>
//       </li>
//     </ul>
//     <section className="top-bar-section">
//       <ul className="left">
//         <li><Link to="/trivia">Trivia</Link></li>
//       </ul>
//       <ul className="right">
//         <li className="has-dropdown">
//           <Link to="/user">{session.hasUser() && store.getCurrentUser().get('username') || 'Guest'}</Link>
//           <ul className="dropdown">
//             {session.hasUser() &&(<li><Link to={'/user'}>User Settings</Link></li>)}
//             {!localStorage.getItem('parse-session-token') && (<li><Link to={'/login'}>Login</Link></li>)}
//             {localStorage.getItem('parse-session-token') && (<li><Link to={'/logout'} onClick={this.handleLogout}>Logout</Link></li>)}
//             {!session.hasUser() && (<li><Link to={'/signup'}>Sign Up</Link></li>)}
//           </ul>
//         </li>
//       </ul>
//     </section>
//   </div>
// </nav>
