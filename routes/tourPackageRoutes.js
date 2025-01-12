const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const TourPackage = require('../models/TourPackage');

// GET all packages
router.get('/', async (req, res) => {
  try {
    const packages = await TourPackage.find();
    res.json(packages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a specific package by ID
router.get('/:id', getTourPackage, (req, res) => {
  res.json(res.tourPackage);
});

// POST a new package with validation
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('location').notEmpty().withMessage('Location is required'),
    body('duration').notEmpty().withMessage('Duration is required'),
    body('capacity').isInt({ gt: 0 }).withMessage('Capacity must be a positive integer'),
    body('departure').isISO8601().withMessage('Departure must be a valid ISO 8601 date'),
    body('return').isISO8601().withMessage('Return must be a valid ISO 8601 date'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number')
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Create a new Tour Package
    const package = new TourPackage({
      name: req.body.name,
      location: req.body.location,
      duration: req.body.duration,  // Added duration
      capacity: req.body.capacity,
      departure: req.body.departure,
      return: req.body.return,
      price: req.body.price
    });

    try {
      const newPackage = await package.save();
      res.status(201).json(newPackage);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

// PUT to update a package by ID
router.put('/:id', getTourPackage, async (req, res) => {
  Object.assign(res.tourPackage, req.body);
  try {
    const updatedPackage = await res.tourPackage.save();
    res.json(updatedPackage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a package by ID
router.delete('/:id', getTourPackage, async (req, res) => {
  try {
    await res.tourPackage.deleteOne();
    res.json({ message: 'Tour Package Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get a TourPackage by ID
async function getTourPackage(req, res, next) {
  let tourPackage;
  try {
    tourPackage = await TourPackage.findById(req.params.id);
    if (!tourPackage) {
      return res.status(404).json({ message: 'Cannot find tour package' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.tourPackage = tourPackage;
  next();
}

module.exports = router;