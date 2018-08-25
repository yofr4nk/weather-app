// schema.js
const { makeExecutableSchema } = require('graphql-tools');
const Place = require('./Place.js');
const WeatherPlacePlace = require('./WeatherPlace.js');
const Forecast = require('./Forecast.js');
const resolvers = require('./resolvers/index.js');

const RootQuery = `
  type Query {
    Forecast: forecastQuery
    Place: placeQuery
  }

  type Mutation {
    setPlaces(places: [String!]!): [Place]
  }
`;

const SchemaDefinition = `
  schema {
    query: Query
    mutation: Mutation
  }
`;

module.exports = makeExecutableSchema({
  typeDefs: [SchemaDefinition, RootQuery, Place, WeatherPlacePlace, Forecast],
  resolvers
});