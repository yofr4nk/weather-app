const path = require('path');
const {getWeatherFromPositions} = require(path.resolve('controllers', 'weatherController'));

const forecast = () => {
  return {
    get: (args, ctx, info) => {
      return getWeatherFromPositions(args.places);
    }
  }
}

module.exports = {forecast};