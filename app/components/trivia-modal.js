import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { History } from 'react-router';

var TriviaModal = React.createClass({
  mixins: [History],

  handleUseLoc(e) {
    e.preventDefault();
    this.history.pushState({}, '/trivia/new')
  },

  handleChooseLoc(e) {
    e.preventDefault();
    this.history.pushState({}, '/trivia/location')
  },

  render: function() {
    return (
      <ReactCSSTransitionGroup transitionName='add-trivia-modal' transitionAppear={true} transitionAppearTimeout={300} 
      transitionEnterTimeout={1} transitionLeaveTimeout={1}>
        <div className='modal-background'>
          <div className='modal-container'>
            <h1>Would you like to use your current location?</h1>
            <button className='success' onClick={this.handleUseLoc}>Use Current Location</button>
            <button className='alert' onClick={this.handleChooseLoc}>Choose Different Location</button>
          </div>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
});

export default TriviaModal;