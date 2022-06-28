const Driver = require('../models/driver');


exports.add = async (req, res) => {
    const {name,
        id,
       licenseNo,
       address,
       qualifications,
       rating,
       noOfRaters,
       contactNumbers } = req.body;
   var newDriver = new Driver({
       name,
      id,
       licenseNo,
       address,
       qualifications,
       rating,
       noOfRaters,
       contactNumbers
   });
   newDriver.save().then(() => {
       res.json("Driver Added.");
   }).catch((err) => {
       res.send(err);
   });
}

exports.update = async (req, res) => {
    const driverId = req.params.id;
    const { name,
        id,
        licenseNo,
        address,
        qualifications,
        rating,
        noOfRaters,
        contactNumbers } = req.body;
    var updateDriver = {
        name,
        id,
        licenseNo,
        address,
        qualifications,
        rating,
        noOfRaters,
        contactNumbers
    };
    var update = Driver.findByIdAndUpdate(driverId, updateDriver).then((update) => {
        res.json(update);
    }).catch((err) => {
        res.send(err);
    });
}
exports.Delete = async (req, res) => {
    var driverId = req.params.id;
    var deleteDriver = Driver.findByIdAndDelete(driverId).then((deleteDriver) => {
        res.json(deleteDriver);
    }).catch((err) => {
        res.send(err);
    });
}
exports.GetId = async (req, res) => {
    var driverId = req.params.id;
    var driver = await Driver.findById(driverId).then((driver) => {
        res.json(driver);
    }).catch((err) => {
        res.send(err);
    });
}
exports.findById = async (req, res) => {
    Driver.find().then((driver) => {
        res.json(driver);
    }).catch((err) => {
        res.send(err);
    })
}
exports.getDriversByLocation = async (req, res) => {
    const location = req.params.location;

    const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
    
    const searchRgx = rgx(location);

    try {
        const driver = await Driver.find().or([
            { "address.province": { $regex: searchRgx, $options: "i" } },
            { "address.district": { $regex: searchRgx, $options: "i" } }
        ]);
        res.send(drivers);
    } catch (err) {
        res.status(500).send(err.message || 'Internal Server Error!')
    }
}
