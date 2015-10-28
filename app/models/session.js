//Code taken from Jake Smith

import $ from 'jquery'
import Backbone from 'backbone';
import store from '../store';
import functions from '../functions';

const Session = Backbone.Model.extend({
  authenticate(options) {
      if (options.username && options.password) {
        return $.ajax({
          url: "https://api.parse.com/1/login",
          data: {
            username: options.username,
            password: options.password
          },
        }).then((response) => {
          this.set('currentUser', store.getUser(response));
          localStorage.setItem('parse-session-token', response.sessionToken);
          return true;
        }, (x) => {console.log(x)});
      } else if (options.sessionToken) {
        // I'm authenticating with a sessionToken
        localStorage.setItem('parse-session-token', options.sessionToken);
        var user = store.getUser(options.sessionToken);
        this.set('currentUser', user);
        return user.fetch().then(() => {
          this.set('currentUser', user.clone());
          return true;
        }, () => false);
      } else {
        console.error("Invalid arguments to authenticate");
        var dfd = new $.Deferred();
        dfd.reject("Invalid arguments to authenticate");
        return dfd.promise();
      }
    },

    restore() {
      var token = localStorage.getItem('parse-session-token');
      if (token) {
        this.authenticate({
          sessionToken: token
        });
      }
    },

    invalidate() {
      localStorage.removeItem('parse-session-token');
      window.location.reload();
    },

    isAuthenticated() {
      return !!this.get('currentUser');
    },

    setLocation() {
      if(arguments.length == 0) {
        functions.getGeo().then((location) => {this.set('location', functions.latLng(location));})
      } else {this.set('location', arguments[0])}
    }
});
export default Session;