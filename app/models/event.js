import Backbone from 'backbone';
import _ from 'underscore';

const Event = Backbone.Model.extend({
	idAttribute: 'objectId',
	urlRoot: 'https://api.parse.com/1/classes/Event',
  defaults: {
    likes: [],
    url: 'No link provided',
    description: 'No description provided',
  },

  validate(attributes) {
    if(!attributes.title) {
      return 'You must have a title'
    }
  },

	toJSON(options) {
    if(options) {

      return _.extend({}, this.attributes, {
        town: {
          "__type": "Pointer",
          "className": "Town",
          "objectId": this.get('town').objectId
        },
        creator: {
          "__type": "Pointer",
          "className": "_User",
          "objectId": this.get('creator').objectId
        }
        
      });
    } else {
      return _.clone(this.attributes);
    }
  }
})

export default Event;