const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var driverSchema = new Schema({
    name: { type: String, required: true },
    id: { type: String, required: true },
    licenseNo: { type: String,required: true},
    address: { province: { type: String }, district: { type: String } },
    qualifications: { type: String,required: true },
    rating: { type: Number,required: true },
    noOfRaters: { type: Number,required: true },
    contactNumbers:{ type: Number,required: true } 
});

module.exports = mongoose.model('driver', driverSchema);