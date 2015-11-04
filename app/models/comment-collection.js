import Backbone from 'backbone';	
import Comment from './comment';

const CommentCollection = Backbone.Collection.extend({
	model: Comment,
	url() {
		return "https://api.parse.com/1/classes/Comment?include=comment_by,comment_on&where=" + JSON.stringify({
			comment_on: {
				__type: 'Pointer',
				className: 'Trivia',
				objectId: this.triviaId,
			},
			// comment_by: {
			// 	__type: 'Pointer',
			// 	className: '_User',
			// 	objectId: this.userId,
			// }
		})
	},
	initialize(models, options) {
		this.triviaId = options && options.triviaId
		this.userId = options && options.userId
	},

	parse(response) {
		return response.results
	}
});

export default CommentCollection;