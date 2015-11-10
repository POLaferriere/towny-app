import React from 'react';
import { IndexLink, Link, History } from 'react-router';
import store from '../store';
import Splash from './splash';
import {Navbar, NavBrand, NavItem, Nav, NavDropdown, MenuItem} from 'react-bootstrap'
import {Typeahead} from 'react-typeahead';
import $ from 'jquery';

var App = React.createClass({
  propTypes: {
    children: React.PropTypes.node
  },

  getInitialState() {
    return {
      townsLoaded: false,
      splashUp: true,
      searchInput: '',
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
    let townId = session.getTownId();
    this.history.pushState({}, '/town/' + townId)
    this.setState({
      splashUp: false,
    })
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

  handleInput(e) {
    this.setState({
      searchInput: e.target.value,
    });
  },

  handleSearch(town) {
    let towns = store.getTownCollection();
    let townId = towns.findWhere({name: town}).get('objectId');
    session.setTown(store.getTown(townId));
    this.history.pushState({}, '/town/' + townId);
    this.setState({
      searchInput: ''
    })
  },

  handleBlur() {
    setTimeout(() => {
      $('.nav-search-results').addClass('hidden');
    }, 1000)
  },

  handleFocus() {
    $('.nav-search-results').removeClass('hidden');
  },

  goToHometown() {
    let townId = session.getHometown();
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
              <Nav navbar ulClassName='left-nav-links'>
                <NavItem linkId='search-bar'>
                  <Typeahead 
                    className='typeahead-component'
                    value={this.state.searchInput}
                    onKeyUp={this.handleInput}
                    options={townNames}
                    placeholder='Find your town'
                    maxVisible={4}
                    onOptionSelected={this.handleSearch}
                    onBlur={this.handleBlur}
                    onFocus={this.handleFocus}
                    customClasses={{
                      input: 'nav-search',
                      results: 'nav-search-results'
                    }}
                    />
                  </NavItem>
              </Nav>
              <Nav right>
                <NavItem onClick={this.goToCreate}>Create a town</NavItem>
                <NavItem onClick={this.goToHometown}>Your hometown</NavItem>
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