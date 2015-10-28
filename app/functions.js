import _ from 'underscore';
import $ from 'jquery';

export default {
	getGeo() {
	 	return new Promise(function(resolve, reject) {
			navigator.geolocation.getCurrentPosition(resolve, reject)
		});
	},

	latLng(geo) {
		return {
			lat: geo.coords.latitude,
			lng: geo.coords.longitude,
		}
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