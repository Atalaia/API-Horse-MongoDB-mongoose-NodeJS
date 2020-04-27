const mongoose = require('mongoose');

const HorseSchema = new mongoose.Schema({
    name: { type: String },
    breed: { type: String },
    gender: { type: String },
    age: { type: Number },
    //ranking devrait avoir le type []
    ranking: { type:[] },
    owner: { type: String },
    certificate: { type: String },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Horse', HorseSchema);