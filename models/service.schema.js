const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    price: { type: Schema.Types.ObjectId, ref: 'Products'},
    patient: { type: Schema.Types.ObjectId, ref: 'Customer', required: true}
})

module.exports = mongoose.model('Service', ServiceSchema);