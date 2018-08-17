const NodeGeocoder = require('node-geocoder');
const redisService = require('../redis-client/client');
const BlueBird = require('bluebird');
const {head} = require('lodash');

const geolocationsFormat = (locations) => {
	const positions= {};
	const countryCache = {};
	for(let location of locations) {
		location = head(location);
		if(!countryCache[location.country]) {
			positions[`${location.latitude}/${location.longitude}`] = {
				address: `${location.country} ${location.state} (${location.countryCode})`,
				latitude: location.latitude,
				longitude: location.longitude
			}
			countryCache[location.country] = true;
		}
	}
	return positions;
}

const setLocations = async () => {
	try {
		const geocoder = NodeGeocoder({
			provider: 'openstreetmap',
		});
		const countries = ['Georgia (USA)', 'Auckland (NZ)', 
		'Santiago (CL)', 'Londres (UK)', 'Sydney (AU)', 'Zurich (CH)'];

		return BlueBird.map(countries, res => {
			return geocoder.geocode(res);
		}, {concurrency: 6})
		.then(locations => {
			const positions = geolocationsFormat(locations);
			return redisService.setAsync('positions', JSON.stringify(positions));
		})
		.catch(err => {
			return new Error(err);
		});
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

