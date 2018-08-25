const path = require('path');
const {getLocations} = require(path.resolve('controllers', 'geolocationController'));

const get = (_, args, ctx, info) => {
  return {
    get: getLocations(args.places)
  }
}

module.exports = get;