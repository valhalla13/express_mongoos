const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create GeoLocation Schema
const GeoSchema = new Schema({
  type: {
    type: String,
    default: "Point"
  },
  coordinates: {
    type: [Number],
    index:"2dsphere"
  }
});

// Create Schema & Model

const NiSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required !']
  },
  rank: {
    type: String
  },
  available: {
    type: Boolean,
    default: false
  },
  geometry: GeoSchema

});

const Ninja = mongoose.model('ninja', NiSchema);
module.exports = Ninja;
