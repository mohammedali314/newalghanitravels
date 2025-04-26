const mongoose = require('mongoose');

const flightSegmentSchema = new mongoose.Schema({
  origin: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  departureTime: {
    type: Date,
    required: true
  },
  arrivalTime: {
    type: Date,
    required: true
  },
  flightNumber: {
    type: String,
    required: true
  },
  baggageAllowance: {
    type: String,
    required: true
  }
});

const flightSchema = new mongoose.Schema({
  segments: [flightSegmentSchema],
  airlineLogo: {
    type: String,
    required: true
  },
  mealIncluded: {
    type: Boolean,
    default: false
  },
  isRoundTrip: {
    type: Boolean,
    default: false
  },
  availableSeats: {
    type: Number,
    required: true,
    min: 0
  },
  price: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Flight', flightSchema); 