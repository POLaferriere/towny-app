import $ from 'jquery';

$.ajaxSetup({
  beforeSend(xhr, options) {
    if(options.url.match(/api.parse.com/)) {
      xhr.setRequestHeader('X-Parse-Application-Id', 'LomjuWXwGTl997odu05M1tcaRiH4NUxPVMBLwhAX');
      xhr.setRequestHeader('X-Parse-REST-API-Key', 'UkSKlYbpVzeb1Qo2in5z9m8Wp4NbSyRPoHwDKWLc');
      if(localStorage.getItem('parse-session-token')) {
      	xhr.setRequestHeader('X-Parse-Session-Token', localStorage.getItem('parse-session-token'))
      }
    }
  }
});