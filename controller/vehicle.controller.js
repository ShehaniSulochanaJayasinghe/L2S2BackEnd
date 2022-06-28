const Vehicle = require("../models/vehicle.model");



module.exports.getVehicles = async function (body = 5,skip = 0) {
  try {
    var a = await Vehicle.find().limit(body).skip(skip);
    return a;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


