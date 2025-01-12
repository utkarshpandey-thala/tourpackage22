const express = require('express');
const Location = require('../models/locationModel');
const router = express.Router();

// Get all locations
router.get('/', async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Create a new location
router.post('/', async (req, res) => {
  const { serialNumber, name, status, actions } = req.body;
  const location = new Location({
    serialNumber,
    name,
    status,
    actions,
  });

  try {
    const newLocation = await location.save();
    res.status(201).json(newLocation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a location by ID (PATCH method)
router.patch('/:id', async (req, res) => {
  try {
    const updatedLocation = await Location.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },  // Only update the fields provided
      { new: true }
    );
    if (!updatedLocation) return res.status(404).json({ message: 'Location not found' });

    res.status(200).json(updatedLocation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a location by ID
router.delete('/:id', async (req, res) => {
  try {
    const location = await Location.findByIdAndDelete(req.params.id);
    if (!location) return res.status(404).json({ message: 'Location not found' });

    res.status(200).json({ message: 'Location deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
