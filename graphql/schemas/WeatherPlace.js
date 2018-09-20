const WeatherPlace = `
type WeatherPlace {
  name: String
  address: String
  hour: String
  temperature: Temperature
}

type Temperature {
  F: String
  C: String
}
`;
module.exports = () => [WeatherPlace];