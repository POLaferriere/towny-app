import Backbone from 'backbone';
import Town from './town';

const TownCollection = Backbone.Collection.extend({
	url: 'https://api.parse.com/1/classes/Town',
	model: Town,
	parse(response) {
		return response.results;
	}
});

export default TownCollection;