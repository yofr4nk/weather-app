const path = require('path');
const {setLocations} = require(path.resolve('controllers', 'geolocationController'));

const setPlaces = (_, args, ctx, info) => {
  return setLocations(args.places);
}

module.exports = {
  setPlaces
};