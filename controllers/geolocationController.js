const NodeGeocoder = require('node-geocoder');
const redisService = require('../redis-client/client');

setLocations = async () => {
	try {
		const geocoder = NodeGeocoder();
		return geocoder.batchGeocode(['Georgia (USA)', 'Auckland (NZ)', 
		'Santiago (CL)', 'Londres (UK)', 'Sydney (AU)', 'Zurich (CH)'], function(err, locations) {
			if(err) throw new Error(err);
			console.log(locations);
			return locations;
		});
	} catch(err) {
		throw err;
	}
}

module.exports = {
	setLocations
}

