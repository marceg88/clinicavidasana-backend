const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    full_name: { type: String, lowercase: true, required: true, maxLength: 150 },
    roles: { type: String, required: true },
    email: { type: String, required: true, maxLength: 100 },
    password: { type: String, required: true },
    address: { type: String, required: true, maxLength: 120 },
    services: [{ type: Schema.Types.ObjectId, ref: 'Service' }],
    avatar_url: { type: String },
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {type: Boolean, default: false},
    customer_payment_id: { type: String },
    cards: [],
    payments: []
});

module.exports = mongoose.model('Customer', CustomerSchema);