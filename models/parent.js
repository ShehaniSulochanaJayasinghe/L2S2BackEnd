const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var parentSchema = new Schema({
    FirstName:{type:String,required:true},
    LastName:{type:String,required:true},
    Email:{type:String,required:true},
    Password:{type:String,required:true},
    ConfirmPassword:{type:String,required:true},
    Address:{type:String,required:true},
    NoOfChildren:{type:Number,required:true},
    ChildName:{type:String,required:true},
    ChildSchool:{type:String,required:true},
    ContactNumbers:{type:Number,required:true},

});

module.exports = mongoose.model('parent',parentSchema);

