const Place = `
type Place {
  name: String
  address: String
  latitude: Float
  longitude: Float
}

type placeQuery {
  get: [Place]
}
`;
module.exports = () => [Place];