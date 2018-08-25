const Forecast = `
type forecastQuery {
  get(places: [String!]): [WeatherPlace]
}
`;
module.exports = () => [Forecast];