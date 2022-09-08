const path = require('path');
const {object} = require('unit.js');
const {geolocationsFormat} = require(path.resolve('controllers', 'geolocationController'));
const {places} = require(path.resolve('test', 'mockData'));

describe('geolactionController testing', () => {
  it('geolocationsFormat should parse the positions array to object keys', () => {
    const expectedData = [
      {
        "address": "Georgia, United States of America",
        "latitude": 32.3293809,
        "longitude": -83.1137366,
        "name": "United States of America Georgia (us)",
      },
      {
        "address": "Auckland, 1010, New Zealand/Aotearoa",
        "latitude": -36.8534665,
        "longitude": 174.7655514,
        "name": "New Zealand/Aotearoa Auckland (nz)",
      },
    ]
    object(geolocationsFormat(places)).is(expectedData);
  });
});
