const { Schema, model } = require('mongoose');
const scoreSchema = require('./Score');

const roundSchema = new Schema(
    {
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
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);

roundSchema.virtual('totalScore').get(function() {
    let strokeValues = scoreSchema.map(score => {
        return score.stroke;
    });
    let totalScore = strokeValues.reduce((acc, value) => acc + value, 0);
    return totalScore;
});

const Round = model('Round', roundSchema);

module.exports = Round;