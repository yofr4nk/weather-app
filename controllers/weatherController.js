const fetch = require('node-fetch');
const {getLocations} = require('./geolocationController');
const RedisService = require('../redis-client/client');
const BlueBird = require('bluebird');
const errorMessage = 'How unfortunate! The API Request Failed';
const {map} = require('lodash');
const moment = require('moment-timezone');

const getWeatherFromPositions = async (ctx) => {
	try{
		if (Math.random(0, 1) < 0.1) throw new Error(errorMessage);
		const getPositions = await getLocations();
		return BlueBird.map(Object.keys(getPositions), (country) => {
			return getWeather({lat: getPositions[country].latitude, lon: getPositions[country].longitude})
		}, {concurrency: 6})
		.then(weathers => {
			ctx.body = map(weathers, city => {
				return {
					country: getPositions[`${city.latitude}/${city.longitude}`].address,
					hour: passUNIXTimeToHour(city.currently.time, city.timezone),
					temperature: city.currently.temperature
				}
			});
		});
	} catch(err) {
		return saveErrorLogs(err)
		.then(() => {
			return getWeatherFromPositions(ctx)
		}).catch(err => {
			throw new Error(err);
		});
	}
}

const passUNIXTimeToHour = (unixTime, timezone) => {
	return moment.unix(unixTime).tz(timezone).format('HH:mm');
}

const saveErrorLogs = async (err) => {
	if(err.message === errorMessage) {
    const redisClient = new RedisService();
		return await redisClient.hsetAsync(new Date().getTime(), "api.errors", err.message);
	}
	throw new Error(err);
}

const getWeather = ({lat, lon}) => {
	const position = `${lat},${lon}`;
	const excludeData = '?exclude=[hourly,daily,flags,minutely]';
	return fetch(`${process.env.SKY_DARK_URI}${position}${excludeData}`, {
		method: 'GET',
		headers: {
			'Cache-Control': 'no-cache',
		}
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