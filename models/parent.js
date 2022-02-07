const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var parenttSchema = new Schema({
    id:{type:String,required:true},
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    confirmpassword:{type:String,required:true},
    address:{type:String,required:true},
    noofchildren:{type:Number,required:true},
    childName:{type:String,required:true},
    childSchool:{type:String,required:true},
     contactNumbers:[{contactNumber:{type:Number}}]

});

module.exports = mongoose.model('Parent',parenttSchema);