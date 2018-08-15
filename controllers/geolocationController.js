const NodeGeocoder = require('node-geocoder');
const redisService = require('../redis-client/client');
const BlueBird = require('bluebird');
const {head} = require('lodash');

const geolocationsFormat = (locations) => {
	const positions= {};
	for(let location of locations) {
		location = head(location);
		if(!positions[location.country]) {
			positions[location.country] = {
				address: `${location.state} (${location.countryCode})`,
				latitude: location.latitude,
				longitude: location.longitude
			}
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
			console.log(err);
			return new Error(err);
		});
	} catch(err) {
		throw new Error(err);
	}
}

const getLocations = async (ctx) => {
	try {
		const positions = await redisService.getAsync('positions');
  	ctx.body = JSON.parse(positions);
	} catch(err) {
		ctx.body = err;
	}
}

module.exports = {
	setLocations,
	geolocationsFormat,
	getLocations
}

