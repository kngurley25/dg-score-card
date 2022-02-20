const { Schema, model } = require('mongoose');
const holeSchema = require('./Hole');

const courseSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: String,
        require: true
    },
    holes: [holeSchema]
});

const Course = model('Course', courseSchema);

module.exports = Course;