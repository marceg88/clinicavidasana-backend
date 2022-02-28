const express = require('express');
const app = express();


const customersRoutes = require('./customers.routes.js');

const authRoutes = require('./auth.routes');
const serviceRoutes = require('./service.routes')
const uploadRoutes = require('./upload.routes');
const paymentRoutes = require('./payment.routes.js');


app.use('/customers', customersRoutes);

app.use('/auth', authRoutes);
app.use('/reqservices', serviceRoutes);
app.use('/payment', paymentRoutes);
app.use('/upload', uploadRoutes);

module.exports = app;