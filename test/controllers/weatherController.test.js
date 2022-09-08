const path = require('path');
const {value} = require('unit.js');
const {passUNIXTimeToHour} = require(path.resolve('controllers', 'weatherController'));

describe('weatherController testing', () => {
  it('passUNIXTimeToHour should pass unix time to hour format', () => {
    const unixTime = 1535117306;
    const timeZone = 'America/New_York';
    const expectedHour = '9:28 AM';
    value(passUNIXTimeToHour(unixTime, timeZone)).is(expectedHour);
  });
});
