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
		let pos = _.values(position).join()
		return new Promise(function(resolve, reject) {
			$.ajax({
				url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + pos + '&result_type=locality&key=AIzaSyAwVYUhWWRWtPBzlPZLRp56hp714OLnRwk',
				success: resolve,
				error: reject,
			})
		})
	} 
}