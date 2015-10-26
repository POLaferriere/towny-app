import Backbone from 'backbone';

var Trivia = Backbone.Model.extend({
	defaults: {
		body: '',
		location: {},
	},
	idAttribute: 'objectId',
	urlRoot: 'https://api.parse.com/1/classes/Trivia',
});

export default Trivia;