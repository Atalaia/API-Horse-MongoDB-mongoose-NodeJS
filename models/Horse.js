const mongoose = require('mongoose');

const HorseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    breed: { type: String, required: true },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'Owner',
        required: true,
    },
    //prize should have type []
    prize: { type: [] },
    certificate: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Horse', HorseSchema);