const Place = `
type Place {
  name: String
  address: String
  latitude: Float
  longitude: Float
  weatherPlace: WeatherPlace
}

type place {
  get(places: [String!]): [Place]
}
`;

module.exports = () => [Place];