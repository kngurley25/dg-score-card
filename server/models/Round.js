const { Schema, model } = require('mongoose');
const scoreSchema = require('./Score');

const roundSchema = new Schema({
    courseName: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    scores: [scoreSchema]
});

const Round = model('Round', roundSchema);

module.exports = Round;