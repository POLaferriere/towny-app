import Backbone from 'backbone';
import Picture from './picture';

const PictureCollection = Backbone.Collection.extend({
	url() {
		if(this.townId) {
			return 'https://api.parse.com/1/classes/Picture?include=town&where' + JSON.stringify({
		 		town: {
			 		__type: 'Pointer',
			 		className: 'Town',
			 		objectId: 'this.townId'
		 		}
		  })
	  } else {
	  	return 'https://api.parse.com/1/classes/Picture'
	  }
	},
	
	model: Picture,

	initialize(options) {
		this.townId = options && options.townId
	},

	parse(response) {
		return response.results;
	}
})

export default PictureCollection;