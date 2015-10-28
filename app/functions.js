import _ from 'underscore';
import $ from 'jquery';

export default {
	getGeo() {
	 	return new Promise(function(resolve, reject) {
			navigator.geolocation.getCurrentPosition(resolve, reject)
		});
	},
	
	getLoc(position) {
		return new Promise(function(resolve, reject) {
			console.log(position);	
			$.ajax({
				url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position + '&key=AIzaSyAwVYUhWWRWtPBzlPZLRp56hp714OLnRwk',
				success: resolve,
				error: reject,
			})
		})
	} 
}