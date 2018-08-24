const path = require('path');
const {array, object, exception, value} = require('unit.js');
const {geolocationsFormat} = require(path.resolve('controllers', 'geolocationController'));
const {places} = require(path.resolve('test', 'mockData'));

describe('geolactionController testing', () => {
  it('geolocationsFormat should parse the positions array to object keys', () => {
    const expectedData = { 
      '32.3293809/-83.1137366': { 
        address: 'United States of America Georgia (us)',
        latitude: '32.3293809',
        longitude: '-83.1137366' 
      },
      '-36.8534665/174.7655514': { 
        address: 'New Zealand/Aotearoa Auckland (nz)',
        latitude: '-36.8534665',
        longitude: '174.7655514' 
      } 
    }
    object(geolocationsFormat(places)).is(expectedData);
  });
});