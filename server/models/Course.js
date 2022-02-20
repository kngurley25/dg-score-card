const { Schema, model } = require('mongoose');

const holeSchema = new Schema({
    holeNumber: {
        type: Number,
        required: true,
    },
    par: {
        type: Number,
        required: true
    }
});

const courseSchema = new Schema(
    {
        courseName: {
            type: String,
            required: true,
            unique: true
        },
        location: {
            type: String,
            require: true
        },
        holes: [holeSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);

courseSchema.virtual('holeCount').get(function() {
    return this.holes.length;
});

const Course = model('Course', courseSchema);

module.exports = Course;