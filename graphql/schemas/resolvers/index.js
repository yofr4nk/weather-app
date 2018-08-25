const Place = require('./place.resolver');
const setPlaces = require('./mutations/setPlaces.resolver');
const Forecast = require('./forecast.resolver');

const resolvers = {
	Query: {
    Forecast,
    Place,
  },
  Mutation: {
    setPlaces: setPlaces
  }
};

module.exports = resolvers;