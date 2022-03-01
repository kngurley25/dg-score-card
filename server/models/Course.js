const { Schema, model } = require('mongoose');

const holeSchema = new Schema(
    {
        holeNumber: {
            type: Number,
            required: true
        },
        par: {
            type: Number,
            required: true,
            default: 3
        },
    },
);

const courseSchema = new Schema(
    {
        courseName: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        location: {
            type: String,
            require: true,
            trim: true
        },
        holeCount: {
            type: Number,
            required: true,
            default: 18
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

courseSchema.virtual('parTotal').get(function() {
    const parArr = this.holes.map(hole => {return hole.par});
    return parArr.reduce((previousValue, currentValue) => previousValue + currentValue)
});

const Course = model('Course', courseSchema);

module.exports = Course;