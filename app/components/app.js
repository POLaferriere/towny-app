import React from 'react';
import { IndexLink, Link, History } from 'react-router';
import store from '../store';
import Splash from './splash';
import {Navbar, NavBrand, NavItem, Nav, NavDropdown, MenuItem} from 'react-bootstrap'
import {Typeahead} from 'react-typeahead';

var App = React.createClass({
  propTypes: {
    children: React.PropTypes.node
  },

  getInitialState() {
    return {
      townsLoaded: false,
      splashUp: true,
    }
  },

  mixins: [History],

  componentWillMount() {
    let towns = store.getTownCollection();
    towns.fetch().then(() => {
      this.setState({
        townsLoaded: true,
      })
    });
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

  handleSearch(town) {
    let towns = store.getTownCollection();
    let townId = towns.findWhere({name: town}).get('objectId');
    session.setTown(store.getTown(townId));
    this.history.pushState({}, '/town/' + townId);
  },

  goToHometown() {
    let townId = session.getTownId();
    this.history.pushState({}, '/town/' + townId)
    this.setState({
      splashUp: false,
    })
  },

  goToNoTown(name) {
    this.history.pushState({}, '/noTown/' + encodeURI(name));
    this.setState({
      splashUp: false,
    })
  },

  goToCreate() {
    this.history.pushState({}, '/create')
  },

  render() {
    let session = store.getSession();
    let towns = store.getTownCollection();
    let townNames = towns.pluck('name');

    return (
      <div>
        {this.state.splashUp &&
          <Splash 
            townsLoaded={this.state.townsLoaded} 
            onSetLocation={this.handleLocationSet} 
            onSetTown={this.goToHometown}
            onNoTown={this.goToNoTown} />}
        {!this.state.splashUp && 
          (<div>
            <Navbar inverse>
              <NavBrand><a href="/">Towny</a></NavBrand>
              <Nav navbar>
                <NavItem onClick={this.goToHometown}>Your hometown</NavItem>
                <NavItem>
                  <Typeahead 
                    className='typeahead-component'
                    options={townNames}
                    placeholder='Find your town'
                    maxVisible={4}
                    onOptionSelected={this.handleSearch}
                    customClasses={{
                      input: 'nav-search',
                      results: 'nav-search-results'
                    }}
                    />
                  </NavItem>
              </Nav>
              <Nav right>
                <NavItem onClick={this.goToCreate}>Create a town</NavItem>
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

            <footer className='footer'/>
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
