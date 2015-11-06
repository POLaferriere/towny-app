import Backbone from 'backbone';
import _ from 'underscore';

const Event = Backbone.Model.extend({
	idAttribute: 'objectId',
	urlRoot: 'https://api.parse.com/1/classes/Event',

	toJSON(options) {
    if(options) {

      return _.extend({}, this.attributes, {
        town: {
          "__type": "Pointer",
          "className": "Town",
          "objectId": this.get('town').objectId
        },
        
      });
    } else {
      return _.clone(this.attributes);
    }
  }
})

export default Event;