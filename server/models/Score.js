const { Schema, model } = require('mongoose');

const scoreSchema = new Schema({
    holeNumber: {
        type: Number,
        required: true
    },
    stroke: {
        type: Number,
        required: true
    }
});

const Score = model('Score', scoreSchema);

module.exports = Score;