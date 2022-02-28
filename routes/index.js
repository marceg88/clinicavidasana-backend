const express = require('express');
const app = express();

// const attendanceRoutes = require('./attendances.routes.js');
const customersRoutes = require('./customers.routes.js');
// const petsRoutes = require('./pets.routes.js');
// const veterinariesRoutes = require('./veterinaries.routes.js');
// const requestServicesRoutes = require('./requestservice.routes');
const authRoutes = require('./auth.routes');
const serviceRoutes = require('./service.routes')
const uploadRoutes = require('./upload.routes');
const paymentRoutes = require('./payment.routes.js');

// app.use('/attendances', attendanceRoutes);
app.use('/customers', customersRoutes);
// app.use('/pets', petsRoutes);
// app.use('/veterinaries', veterinariesRoutes);
// app.use('/requestservices', requestServicesRoutes);
app.use('/auth', authRoutes);
app.use('/reqservices', serviceRoutes);
app.use('/payment', paymentRoutes);
app.use('/upload', uploadRoutes);

module.exports = app;