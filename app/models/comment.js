import Backbone from 'backbone';
import _ from 'underscore';

const Comment = Backbone.Model.extend({
	idAttribute: 'objectId',
	defaults: {
		comment_on: {},
		comment_by: {},
	},
	urlRoot: 'https://api.parse.com/1/classes/Comment',

	toJSON(options) {
    if(options) {

      return _.extend({}, this.attributes, {
        comment_on: {
          "__type": "Pointer",
          "className": "Trivia",
          "objectId": this.get('comment_on').objectId
        },
        comment_by: {
          "__type": "Pointer",
          "className": "_User",
          "objectId": this.get('comment_by').objectId
        }
      });
    } else {
      return _.clone(this.attributes);
    }
  },
});

export default Comment;