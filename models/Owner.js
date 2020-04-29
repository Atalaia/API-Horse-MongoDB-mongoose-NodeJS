const mongoose = require('mongoose');

const OwnerSchema = new mongoose.Schema({
    firstname: { type: String, required: true} ,
    lastname: { type: String, required: true} ,
    email: { type: String, required: true} ,
    created_at: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Owner', OwnerSchema);