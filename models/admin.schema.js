const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    full_name: { type: Schema.Types.ObjectId, ref: 'Customer' },
    email: { type: Schema.Types.ObjectId, ref: 'Customer'},
    patient: { type: Schema.Types.ObjectId, ref: 'Customer'},
    services: [{ type: Schema.Types.ObjectId, ref: 'Service' }],
    name_serv: [{ type: Schema.Types.ObjectId, ref: 'Service' }],
    active: {type: Boolean, default: false},
});

module.exports = mongoose.model('Admin', AdminSchema);