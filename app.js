const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const multer=require('multer');
const tourPackageRoutes = require('./routes/tourPackageRoutes');
const bookingLogRoutes = require('./routes/bookingLogRoutes');
const seminarPlanRoutes = require('./routes/seminarPlanRoutes');
const seminarLogRoutes = require('./routes/seminarLogRoutes'); 
const categoryRoutes = require('./routes/categoryRoutes');
const locationRoutes = require('./routes/locationRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(cors());

app.use(bodyParser.json());
app.use(cors());
app.use('/api/tour-packages', tourPackageRoutes);
app.use('/api/bookings', bookingLogRoutes);
app.use('/api/seminar-plans', seminarPlanRoutes); 
app.use('/api/seminar-logs', seminarLogRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/locations', locationRoutes);

mongoose.connect(process.env.DATABASE_URL)
  .then(() => {
    console.log('Database connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('Database connection error:', err));
