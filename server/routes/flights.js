const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Flight = require('../models/Flight');

// Set up multer for airline logo uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Add new flight
router.post('/', upload.single('airlineLogo'), async (req, res) => {
  try {
    console.log('Received request body:', req.body);
    console.log('Received file:', req.file);

    let segments;
    try {
      segments = typeof req.body.segments === 'string' 
        ? JSON.parse(req.body.segments) 
        : req.body.segments;
    } catch (error) {
      console.error('Error parsing segments:', error);
      return res.status(400).json({ message: 'Invalid segments data' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Airline logo is required' });
    }

    const flight = new Flight({
      segments: segments,
      airlineLogo: `/uploads/${req.file.filename}`,
      mealIncluded: req.body.mealIncluded === 'true',
      isRoundTrip: req.body.isRoundTrip === 'true',
      availableSeats: parseInt(req.body.availableSeats),
      price: parseFloat(req.body.price)
    });

    console.log('Creating flight:', flight);

    await flight.save();
    res.status(201).json(flight);
  } catch (error) {
    console.error('Error creating flight:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all flights
router.get('/', async (req, res) => {
  try {
    const flights = await Flight.find().sort({ createdAt: -1 });
    res.json(flights);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single flight
router.get('/:id', async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }
    res.json(flight);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update flight
router.put('/:id', upload.single('airlineLogo'), async (req, res) => {
  try {
    const {
      segments,
      mealIncluded,
      isRoundTrip,
      availableSeats,
      price
    } = req.body;

    const parsedSegments = typeof segments === 'string' ? JSON.parse(segments) : segments;

    const flight = await Flight.findById(req.params.id);
    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    flight.segments = parsedSegments;
    if (req.file) {
      flight.airlineLogo = `/uploads/${req.file.filename}`;
    }
    flight.mealIncluded = mealIncluded === 'true';
    flight.isRoundTrip = isRoundTrip === 'true';
    flight.availableSeats = parseInt(availableSeats);
    flight.price = parseFloat(price);

    await flight.save();
    res.json(flight);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete flight
router.delete('/:id', async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }
    await Flight.deleteOne({ _id: req.params.id });
    res.json({ message: 'Flight removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 