const path = require('path');
const {getWeatherFromPositions} = require(path.resolve('controllers', 'weatherController'));
const {head} = require('lodash');

const Place = {
	weatherPlace: async (places, args, ctx, info) => {
		const weather = await getWeatherFromPositions(null, [places]);
		return head(weather);
	}
}

module.exports = {Place};