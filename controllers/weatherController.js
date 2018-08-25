const fetch = require('node-fetch');
const {getLocations} = require('./geolocationController');
const BlueBird = require('bluebird');
const {map, find} = require('lodash');
const moment = require('moment-timezone');

const getWeatherFromPositions = async () => {
  const positions = await getLocations();

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
        temperature: city.currently.temperature
      }
    });
  })
  .catch(err => {
    return BlueBird.reject(err);
  });
}

const passUNIXTimeToHour = (unixTime, timezone) => {
	return moment.unix(unixTime).tz(timezone).format('HH:mm');
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