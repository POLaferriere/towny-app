import $ from 'jquery';

$.ajaxSetup({
  beforeSend(xhr, options) {
    if(options.url.match(/api.parse.com/)) {
      xhr.setRequestHeader('X-Parse-Application-Id', '');
      xhr.setRequestHeader('X-Parse-REST-API-Key', '');
    }
  }
})
