import React from 'react';
import { IndexLink, Link } from 'react-router';
import store from '../store';
import Splash from './splash';

var App = React.createClass({
  propTypes: {
    children: React.PropTypes.node
  },

  handleLocationSet() {
    this.forceUpdate();
  },

  handleLogout() {
    let session = store.getSession();
    localStorage.removeItem('parse-session-token');
    session.unset('currentUser');
    this.forceUpdate();
  },

  render() {
    let session = store.getSession();

    return (
      <div>
        {session.hasLocation() === false &&
          <Splash onSetLocation={this.handleLocationSet}/>}
        {session.hasLocation() && 
          (<div>
            <nav className="top-bar" data-topbar role="navigation">
              <ul className="title-area">
                <li className="name">
                  <h1><IndexLink to="/">Towny</IndexLink></h1>
                </li>
              </ul>
              <section className="top-bar-section">
                <ul className="left">
                  <li><Link to="/trivia">Trivia</Link></li>
                </ul>
                <ul className="right">
                  <li className="has-dropdown">
                    <Link to="/user">{session.hasUser() && store.getCurrentUser().get('username') || 'Guest'}</Link>
                    <ul className="dropdown">
                      {session.hasUser() &&(<li><Link to={'/user'}>User Settings</Link></li>)}
                      {!localStorage.getItem('parse-session-token') && (<li><Link to={'/login'}>Login</Link></li>)}
                      {localStorage.getItem('parse-session-token') && (<li><Link to={'/logout'} onClick={this.handleLogout}>Logout</Link></li>)}
                      {!session.hasUser() && (<li><Link to={'/signup'}>Sign Up</Link></li>)}
                    </ul>
                  </li>
                </ul>
              </section>
            </nav>

            {this.props.children}
          </div>)}
      </div>
  )}

});

export default App;
