import Backbone from 'backbone';

const Picture = Backbone.Model.extend({
	idAttribute: 'objectId',
	urlRoot: 'https://api.parse.com/1/classes/Picture',

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

export default Picture;