import Backbone from 'backbone';
import _ from 'underscore';

const Picture = Backbone.Model.extend({
	idAttribute: 'objectId',
	urlRoot: 'https://api.parse.com/1/classes/Picture',
  defaults: {
    likes: [],
    caption: '',
    url: '',
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
          "objectId": this.get('user').objectId
        }
      });
    } else {
      return _.clone(this.attributes);
    }
  }
})

export default Picture;