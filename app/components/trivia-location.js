import React from 'react';
import Geosuggest from 'react-geosuggest';

const TriviaLocation = React.createClass({
	render() {
		return (
			<div className='modal-background'>
        <div className='modal-container'>
          <h1>Choose your location</h1>
          <Geosuggest placeholder='Type location here'/>
        </div>
      </div>
		)
	}
})

export default TriviaLocation;