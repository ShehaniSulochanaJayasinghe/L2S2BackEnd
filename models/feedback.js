const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var feedbackSchema = new Schema({
//id: { type: String, required: true },
    name: { type: String },
    email: { type: String },
    comment: { type: String },
    rating: { type: Number },
    userId: { type: String, required: true },
    driverId: { type: String, required: true }
}, {
   timestamps: true
});

module.exports = mongoose.model('Feedback', feedbackSchema);