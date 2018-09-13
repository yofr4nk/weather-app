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
}

module.exports = Place;