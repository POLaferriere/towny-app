import React from 'react';
import Geosuggest from 'react-geosuggest';
import store from '../store';
import {History} from 'react-router';

const TriviaLocation = React.createClass({
	mixins: [History],
	
	handleSelect(suggest) {
		let session = store.getSession();
		session.setLocation(suggest.location);
	},

	handleClick(e) {
		e.preventDefault();
		this.history.pushState({}, '/trivia/new');
	},

	render() {
		return (
			<div className='modal-background'>
        <div className='modal-container'>
          <h1>Choose your location</h1>
          <Geosuggest placeholder='Type location here' onSuggestSelect={this.handleSelect}/>
          <button onClick={this.handleClick}>Select location</button>
        </div>
      </div>
		)
	}
})

export default TriviaLocation;