const mongoose = require('mongoose');
const BlueBird = require('bluebird');

class Place {
  constructor() {
    this.Place;
    this.init();
  }

  init() {
    this.createSchema();
  }

  createSchema() {
    const SchemaTypes = mongoose.Schema.Types;
    const PlaceSchema = new mongoose.Schema({
      name: {
        type: String
      },
      latitude: {
        type: SchemaTypes.Number
      },
      longitude: {
        type: SchemaTypes.Number
      },
      address: {
        type: String
      }
    });
    this.Place = mongoose.models.Place || mongoose.model('Place', PlaceSchema);
  }

  insertPlaces(places) {
    return BlueBird.map(places, place => {
      return this.Place.findOneAndUpdate({name: place.name}, place, { upsert: true, new: true });
    }, {concurrency: 5});
  }

  getPlaces(places) {
    const buildRegexParams = this.buildRegexSearchParams(places);
    const condition = (places) ? { $or: [
      {name: {$in: buildRegexParams}},
      {address: {$in: buildRegexParams}}
    ]} : {};
    return this.Place.find(condition);
  }

  buildRegexSearchParams(params) {
    if(params)
      return params.map(param => {
        return new RegExp(`${param}`, 'i');
      });
  }
}

module.exports = Place;