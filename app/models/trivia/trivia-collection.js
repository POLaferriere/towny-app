import Backbone from 'backbone';
import Trivia from './trivia';

var TriviaCollection = Backbone.Collection.extend({
	url: 'https://api.parse.com/1/classes/Trivia',
	model: Trivia,
	parse(response) {
		 return response.results;
	}
});

export default TriviaCollection;
