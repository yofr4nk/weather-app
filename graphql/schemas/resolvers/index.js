const Place = require('./place.resolver');
const setPlaces = require('./mutations/setPlaces.resolver');

const resolvers = {
	Query: {
		forecast: Place
  },
  Mutation: {
    setPlaces: setPlaces
  }
};

module.exports = resolvers;