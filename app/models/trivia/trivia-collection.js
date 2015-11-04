import Backbone from 'backbone';
import Trivia from './trivia';

var TriviaCollection = Backbone.Collection.extend({
	url() {
		if(this.townId) {
			return 'https://api.parse.com/1/classes/Trivia?include=town&where=' + JSON.stringify({
				town: {
					__type: 'Pointer',
					className: 'Town',
					objectId: this.townId,
				}
		})} else {
				return 'https://api.parse.com/1/classes/Trivia'
			}

	},
	model: Trivia,

	initialize(options) {
		this.townId = options && options.townId;
	},

	parse(response) {
		 return response.results;
	},
});

export default TriviaCollection;
