const batchSearch = require('search-osm-batch');
const RedisService = require('../redis-client/client');

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
  const countries = ['Georgia (USA)', 'Auckland (NZ)', 
  'Santiago (CL)', 'Londres (UK)', 'Sydney (AU)', 'Zurich (CH)'];
  const redisClient = new RedisService();
  
  const locations = await batchSearch(countries, {
    format: 'json',
    addressdetails: 1,
    limit: 1,
    dedupe: 1
  });
  
  const positions = geolocationsFormat(locations);
  return redisClient.setAsync('positions', JSON.stringify(positions));
}

const getLocations = async () => {
  try {
    const redisClient = new RedisService();
    const positions = await redisClient.getAsync('positions');
    return JSON.parse(positions);
  } catch(err) {
    throw new Error(err);
  }
}

module.exports = {
	setLocations,
	geolocationsFormat,
	getLocations
}

