const { Schema, model } = require('mongoose');

const holeSchema = new Schema({
    number: {
        type: Number,
        required: true,
    },
    par: {
        type: Number,
        required: true
    }
});

const Hole = model('Hole', holeSchema);

module.exports = Hole;