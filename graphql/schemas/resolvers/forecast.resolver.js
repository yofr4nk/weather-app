const path = require('path');
const {getWeatherFromPositions} = require(path.resolve('controllers', 'weatherController'));

const get = (_, args, ctx, info) => {
  return {
    get: getWeatherFromPositions(args.places)
  }
}

module.exports = get;