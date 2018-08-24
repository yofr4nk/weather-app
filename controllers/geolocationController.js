const batchSearch = require('search-osm-batch');
const redisService = require('../redis-client/client');

const geolocationsFormat = (locations) => {
	const positions= {};
	const countryCache = {};
	for(const location of locations) {
		if(!countryCache[location.address.country]) {
			positions[`${location.lat}/${location.lon}`] = {
				address: `${location.address.country} ${location.address.state} (${location.address.country_code})`,
				latitude: location.lat,
				longitude: location.lon
			}
			countryCache[location.address.country] = true;
		}
	}
	return positions;
}

const setLocations = async () => {
	try {
		const countries = ['Georgia (USA)', 'Auckland (NZ)', 
		'Santiago (CL)', 'Londres (UK)', 'Sydney (AU)', 'Zurich (CH)'];
		
		const locations = await batchSearch(countries, {
			format: 'json',
			addressdetails: 1,
			limit: 1,
			dedupe: 1
		});

		const positions = geolocationsFormat(locations);
		return redisService.setAsync('positions', JSON.stringify(positions));
	} catch(err) {
		throw new Error(err);
	}
}

const getLocations = async () => {
	const positions = await redisService.getAsync('positions');
	return JSON.parse(positions);
}

module.exports = {
	setLocations,
	geolocationsFormat,
	getLocations
}

