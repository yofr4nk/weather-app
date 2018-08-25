const Place = require('./place.resolver');
const resolvers = {
	Query: {
		forecast: Place
	}
};

module.exports = resolvers;