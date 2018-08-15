const fetch = require('node-fetch');
const {getLocations} = require('./geolocationController');
const redisService = require('../redis-client/client');
const errorMessage = 'How unfortunate! The API Request Failed';

const getWeatherFromPositions = async (ctx) => {
	try{
		if (Math.random(0, 1) < 0.1) {
			throw new Error(errorMessage)
		}
		const getlocationsFromRedis = await getLocations();
		ctx.body = getlocationsFromRedis;
	} catch(err) {
		return saveErrorLogs(err)
		.then(() => {
			return getWeatherFromPositions(ctx)
		}).catch(err => {
			throw new Error(err);
		});
	}
}

const saveErrorLogs = async (err) => {
	if(err.message === errorMessage) {
		return await redisService.hsetAsync(new Date().getTime(), "api.errors", err.message);
	}
	throw new Error(err);
}

module.exports = {
  getWeatherFromPositions
}