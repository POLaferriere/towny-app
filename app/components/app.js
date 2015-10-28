import React from 'react';
import { IndexLink, Link } from 'react-router';
import store from '../store'

var App = React.createClass({
  propTypes: {
    children: React.PropTypes.node
  },

  handleLogout() {
    localStorage.removeItem('parse-session-token');
    store.getSession().destroy();
    this.forceUpdate();
  },

  render() {
    return (
      <div>
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
                <a href="#">Navigate</a>
                <ul className="dropdown">
                  {!localStorage.getItem('parse-session-token') && (<li><Link to={'/login'}>Login</Link></li>)}
                  {localStorage.getItem('parse-session-token') && (<li><Link to={'/logout'} onClick={this.handleLogout}>Logout</Link></li>)}
                  <li><Link to={'/signup'}>Sign Up</Link></li>
                </ul>
              </li>
            </ul>
          </section>
        </nav>

        {this.props.children}
      </div>
    );
  }

});

export default App;
