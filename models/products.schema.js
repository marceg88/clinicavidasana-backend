const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: { type: String, required: true },
    description: { type: Date, required:true },
})

module.exports = mongoose.model('Products', ProductSchema);