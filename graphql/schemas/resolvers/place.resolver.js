const path = require('path');
const {getWeatherFromPositions} = require(path.resolve('controllers', 'weatherController'));

const Place = (_, args, ctx, info) => {
  return getWeatherFromPositions(args.places);
}

module.exports = Place;