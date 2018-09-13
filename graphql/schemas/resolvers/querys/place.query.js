const path = require('path');
const {getLocations} = require(path.resolve('controllers', 'geolocationController'));

const place = () => {
	return {
		get: (args, ctx, info) => {
			ctx.places = args.places;
			return getLocations(args.places);
		}
	}
}

module.exports = {
	place
};