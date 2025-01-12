const express = require('express');
const router = express.Router();
const multer = require('multer');
const Advertisement = require('../models/advertisement.model');

// Configure Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to store files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  },
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB size limit
});

// Create a new advertisement
router.post('/advertisements', upload.single('image'), async (req, res) => {
  try {
    const { type, size, redirectUrl } = req.body;
    let imagePath = null;

    if (type === 'image' && req.file) {
      imagePath = req.file.path; // Save image path if type is "image"
    }

    const newAd = new Advertisement({ type, size, redirectUrl, imagePath });
    await newAd.save();
    res.status(201).json({ message: 'Advertisement created successfully!', advertisement: newAd });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all advertisements
router.get('/advertisements', async (req, res) => {
  try {
    const ads = await Advertisement.find();
    res.status(200).json(ads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Edit an advertisement
router.put('/advertisements/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedAd = await Advertisement.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedAd) return res.status(404).json({ message: 'Advertisement not found!' });
    res.status(200).json({ message: 'Advertisement updated successfully!', advertisement: updatedAd });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Disable an advertisement
router.patch('/advertisements/:id/disable', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAd = await Advertisement.findByIdAndUpdate(id, { status: 'Disabled' }, { new: true });
    if (!updatedAd) return res.status(404).json({ message: 'Advertisement not found!' });
    res.status(200).json({ message: 'Advertisement disabled successfully!', advertisement: updatedAd });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Enable an advertisement
router.patch('/advertisements/:id/enable', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAd = await Advertisement.findByIdAndUpdate(id, { status: 'Enabled' }, { new: true });
    if (!updatedAd) return res.status(404).json({ message: 'Advertisement not found!' });
    res.status(200).json({ message: 'Advertisement enabled successfully!', advertisement: updatedAd });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete an advertisement
router.delete('/advertisements/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAd = await Advertisement.findByIdAndDelete(id);
    if (!deletedAd) return res.status(404).json({ message: 'Advertisement not found!' });
    res.status(200).json({ message: 'Advertisement deleted successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
