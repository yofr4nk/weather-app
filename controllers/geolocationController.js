const batchSearch = require('search-osm-batch');
const PlaceClass = require('../models/Place');

const geolocationsFormat = (locations) => {
  return locations.map(location => {
    return {
      name: `${location.address.country} ${location.address.state} (${location.address.country_code})`,
      address: location.display_name,
      latitude: parseFloat(location.lat),
      longitude: parseFloat(location.lon)
    };
  });
}

const setLocations = async (places) => {
  const Place = new PlaceClass();
  
  const locations = await batchSearch(places, {
    format: 'json',
    addressdetails: 1,
    limit: 1,
    dedupe: 1
  });
  
  const positions = geolocationsFormat(locations);
  return Place.insertPlaces(positions);
}

const getLocations = (places) => {
  const Place = new PlaceClass();
  return Place.getPlaces(places);
}

module.exports = {
	setLocations,
	geolocationsFormat,
	getLocations
}

