import Backbone from 'backbone';

const Town = Backbone.Model.extend({
	idAttribute: 'objectId',
	urlRoot: 'https://api.parse.com/1/classes/Town',

	defaults: {
		name: ''
	}
});

export default Town;