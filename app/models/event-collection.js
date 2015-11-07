import Backbone from 'backbone';
import Event from './event';

const EventCollection = Backbone.Collection.extend({
	url() {
		if(this.townId) {
			return 'https://api.parse.com/1/classes/Event?include=town&where=' + JSON.stringify({
		 		town: {
			 		__type: 'Pointer',
			 		className: 'Town',
			 		objectId: 'this.townId'
		 		}
		  })
	  } else {
	  	return 'https://api.parse.com/1/classes/Event'
	  }
	},
	
	model: Event,

	initialize(options) {
		this.townId = options && options.townId
	},

	parse(response) {
		return response.results;
	}
})

export default EventCollection;