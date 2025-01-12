const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const seminarLogs = await SeminarLog.find().populate('user').populate('plan');
    res.json(seminarLogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const seminarLog = await SeminarLog.findById(req.params.id).populate('user').populate('plan');
    if (!seminarLog) return res.status(404).json({ message: 'Seminar Log not found' });
    res.json(seminarLog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const seminarLogData = req.body;
  
  try {
    const seminarPlan = await SeminarPlan.findById(seminarLogData.plan);
    if (seminarPlan.capacity - seminarPlan.sold < seminarLogData.seat) {
      return res.status(400).json({ message: 'Not enough seats available' });
    }
    const seminarLog = new SeminarLog(seminarLogData);
    const newSeminarLog = await seminarLog.save();
    
    seminarPlan.sold += seminarLogData.seat;
    await seminarPlan.save();

    res.status(201).json(newSeminarLog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const seminarLog = await SeminarLog.findById(req.params.id);
    if (!seminarLog) return res.status(404).json({ message: 'Seminar Log not found' });

    const seminarPlan = await SeminarPlan.findById(seminarLog.plan);
    seminarPlan.sold -= seminarLog.seat;
    await seminarPlan.save();

    await seminarLog.deleteOne();
    res.json({ message: 'Booking cancelled' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
