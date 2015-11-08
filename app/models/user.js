import Backbone from 'backbone';
import _ from 'underscore'

const User = Backbone.Model.extend({
	idAttribute: 'objectId',
	urlRoot() {
		if(localStorage.getItem('parse-session-token')) {
			return 'https://api.parse.com/1/users/me?include=hometown'
		} else {
			return 'https://api.parse.com/1/users?include=hometown'
		}
	},
	// toJSON(options) {
 //    if(options) {

 //      return _.extend({}, this.attributes, {
 //        hometown: {
 //          "__type": "Pointer",
 //          "className": "Town",
 //          "objectId": this.get('hometown').objectId
 //        },
 //      });
 //    } else {
 //      return _.clone(this.attributes);
 //    }
  // }
});



export default User;