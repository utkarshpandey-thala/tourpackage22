const express = require('express');
const router = express.Router();
// const SeminarPlan = require('../models/SeminarPlan');

// GET all seminar plans
router.get('/', async (req, res) => {
  try {
    const seminarPlans = await SeminarPlan.find();
    res.json(seminarPlans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a specific seminar plan by ID
router.get('/:id', async (req, res) => {
  try {
    const seminarPlan = await SeminarPlan.findById(req.params.id);
    if (!seminarPlan) return res.status(404).json({ message: 'Seminar Plan not found' });
    res.json(seminarPlan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new seminar plan
router.post('/', async (req, res) => {
  const seminarPlan = new SeminarPlan(req.body);

  try {
    const newSeminarPlan = await seminarPlan.save();
    res.status(201).json(newSeminarPlan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT to update a seminar plan by ID
router.put('/:id', async (req, res) => {
  try {
    const seminarPlan = await SeminarPlan.findById(req.params.id);
    if (!seminarPlan) return res.status(404).json({ message: 'Seminar Plan not found' });

    Object.assign(seminarPlan, req.body);
    const updatedSeminarPlan = await seminarPlan.save();
    res.json(updatedSeminarPlan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a seminar plan by ID
router.delete('/:id', async (req, res) => {
  try {
    const seminarPlan = await SeminarPlan.findById(req.params.id);
    if (!seminarPlan) return res.status(404).json({ message: 'Seminar Plan not found' });

    await seminarPlan.deleteOne();
    res.json({ message: 'Seminar Plan Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
