import React from 'react';
import { IndexLink, Link, History } from 'react-router';
import store from '../store';
import Splash from './splash';
import {Navbar, NavBrand, NavItem, Nav, NavDropdown, MenuItem, OverlayTrigger, Popover} from 'react-bootstrap'
import {Typeahead} from 'react-typeahead';
import $ from 'jquery';
import Login from './login'

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
    this.history.pushState({}, '/town/' + townId + '/landing')
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
    this.history.pushState({}, '/signup')
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
    this.history.pushState({}, '/town/' + townId + '/landing');
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

  goToTown() {
    this.history.pushState({}, '/town/' + session.getTownId() + '/landing')
    this.setState({
      splashUp: false,
    })
  },

  goToHometown() {
    let hometown = session.getUser().get('hometown').objectId;
    session.setTown(store.getTown(hometown));
    this.history.pushState({}, '/town/' + hometown + '/landing')
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

  onSubmit() {
    this.forceUpdate();
  },

  render() {
    let session = store.getSession();
    let towns = store.getTownCollection();
    let townNames = towns.pluck('name');

    let childrenWithProps = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {onSubmit: this.onSubmit})
    })

    return (
      <div>
        {this.state.splashUp &&
          <Splash 
            townsLoaded={this.state.townsLoaded} 
            onSetLocation={this.handleLocationSet} 
            onSetTown={this.goToTown}
            onNoTown={this.goToNoTown} />}
        {!this.state.splashUp && 
          (<div>
            <Navbar inverse>
              <NavBrand><a href="/">Town(y)</a></NavBrand>
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
                {session.hasUser() &&<NavItem onClick={this.goToCreate}>Create a town</NavItem>}
                {session.hasUser() && <NavItem onClick={this.goToHometown}>Your hometown</NavItem>}
                {!localStorage.getItem('parse-session-token') && 
                  <OverlayTrigger 
                    trigger="click"
                    rootClose 
                    placement="bottom"
                    id='login-popover' 
                    overlay={<Popover><Login popover={true} onLogin={this.onSubmit}/></Popover>}>
                    <MenuItem>Login</MenuItem>
                  </OverlayTrigger>}
                {!session.hasUser() && <NavItem onClick={this.handleSignup}>Sign Up</NavItem>}

                {session.hasUser() && <NavDropdown 
                  eventKey={3} 
                  title={session.hasUser() && store.getCurrentUser().get('username') || 'Guest'} 
                  id="basic-nav-dropdown">
                  {session.hasUser() && <MenuItem eventKey="1" onClick={this.handleUser}>User Settings</MenuItem>}
                  {localStorage.getItem('parse-session-token') && <NavItem onClick={this.handleLogout}>Logout</NavItem>}
                </NavDropdown>}
              </Nav>
            </Navbar>
           

            {childrenWithProps}

            <footer className='footer'/>
          </div>)}
      </div>
  )}

});

export default App;