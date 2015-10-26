import React from 'react';
import { IndexLink, Link } from 'react-router';

var App = React.createClass({
  propTypes: {
    children: React.PropTypes.node
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
          </section>
        </nav>

        {this.props.children}
      </div>
    );
  }

});

export default App;
