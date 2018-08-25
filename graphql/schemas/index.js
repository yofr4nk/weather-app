// schema.js
const { makeExecutableSchema } = require('graphql-tools');
const Place = require('./Place.js');
const resolvers = require('./resolvers/index.js');

const RootQuery = `
  type Query {
    forecast(places: [String]): [Place]
  }
`;

const SchemaDefinition = `
  schema {
    query: Query
  }
`;

module.exports = makeExecutableSchema({
  typeDefs: [SchemaDefinition, RootQuery, Place],
  resolvers
});