const { Schema, model } = require('mongoose');

const holeSchema = new Schema({
    holeNumber: {
        type: Number,
        required: true
    },
    par: {
        type: Number,
        required: true
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

courseSchema.virtual('parTotal').get(function() {
    const parArr = this.holes.map(hole => {return hole.par});
    return parArr.reduce((previousValue, currentValue) => previousValue + currentValue)
});

const Course = model('Course', courseSchema);

module.exports = Course;