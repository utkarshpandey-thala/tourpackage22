const express = require('express');
const router = express.Router();
const TourPackage = require('../models/TourPackage');
const BookingLog = require('../models/BookingLog');
router.get('/', async (req, res) => {
  try {
    const bookings = await BookingLog.find().populate('user').populate('plan');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const booking = await BookingLog.findById(req.params.id).populate('user').populate('plan');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post('/', async (req, res) => {
  const bookingData = req.body;
  try {
    const tourPackage = await TourPackage.findById(bookingData.plan);
    if (tourPackage.capacity - tourPackage.sold < bookingData.seat) {
      return res.status(400).json({ message: 'Not enough seats available' });
    }
    const booking = new BookingLog(bookingData);
    const newBooking = await booking.save();
    tourPackage.sold += bookingData.seat;
    await tourPackage.save();

    res.status(201).json(newBooking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.delete('/:id', async (req, res) => {
  try {
    const booking = await BookingLog.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    const tourPackage = await TourPackage.findById(booking.plan);
    tourPackage.sold -= booking.seat;
    await tourPackage.save();

    await booking.deleteOne();
    res.json({ message: 'Booking deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
