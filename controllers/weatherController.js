const fetch = require('node-fetch');
const {getLocations} = require('./geolocationController');
const BlueBird = require('bluebird');
const {map, find} = require('lodash');
const moment = require('moment-timezone');

const getWeatherFromPositions = async (places, placesReadyToSearch) => {
  let positions = placesReadyToSearch;
  
  if(!placesReadyToSearch) positions = await getLocations(places);
  return BlueBird.map(positions, (position) => {
    return getWeather({lat: position.latitude, lon: position.longitude})
  }, {concurrency: 6})
  .then(weathers => {
    return map(weathers, city => {
      const positionMatch = find(positions, {latitude: city.latitude, longitude: city.longitude});
      return {
        name: positionMatch.name,
        address: positionMatch.address,
        hour: passUNIXTimeToHour(city.currently.time, city.timezone),
        temperature: {
          F: Math.round(city.currently.temperature),
          C: toCelsiusConvert(city.currently.temperature)
        }
      }
    });
  })
  .catch(err => {
    return BlueBird.reject(err);
  });
}

const passUNIXTimeToHour = (unixTime, timezone) => {
	return moment.unix(unixTime).tz(timezone).format('LT');
}

const toCelsiusConvert = (value) => {
  const initialState = value - 32;
  return Math.round((initialState * 5) / 9);
}

const getWeather = ({lat, lon}) => {
	const position = `${lat},${lon}`;
	const excludeData = '?exclude=[hourly,daily,flags,minutely]';
	return fetch(`${process.env.SKY_DARK_URI}${position}${excludeData}`, {
		method: 'GET'
	})
  .then(function(response) {
    return response.json();
  })
  .then(function(weather) {
    return weather;
  })
}
module.exports = {
	getWeatherFromPositions,
	passUNIXTimeToHour
}