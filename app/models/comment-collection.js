import Backbone from 'backbone';	
import Comment from './comment';

const CommentCollection = Backbone.Collection.extend({
	model: Comment,
	url() {
		if(this.triviaId){
			return "https://api.parse.com/1/classes/Comment?include=comment_on&where=" + JSON.stringify({
				comment_on: {
					__type: 'Pointer',
					className: 'Trivia',
					objectId: this.triviaId,
				},
			})
		} else if (this.pictureId) {
			return "https://api.parse.com/1/classes/Comment?include=comment_on&where=" + JSON.stringify({
				comment_on: {
					__type: 'Pointer',
					className: 'Trivia',
					objectId: this.pictureId,
				},
			})
		} else {
			return 'https://api.parse.com/1/classes/Comment'
		}
	},
	initialize(models, options) {
		this.triviaId = options && options.triviaId
		this.userId = options && options.userId
		this.pictureId = options && options.pictureId
	},

	parse(response) {
		return response.results
	}
});

export default CommentCollection;