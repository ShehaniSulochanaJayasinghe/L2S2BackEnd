const Feedback = require('../models/feedback');
const Driver = require('../models/driver');
const User = require('../models/user');


exports.getByDriverId = async (req, res) => {
    Feedback.find({ driverId: req.params.driverId }).then((feedbacks) => {
        res.json(feedbacks);
    }).catch((err) => {
        res.send(err);
    });
}

exports.add = async (req, res) => {
    try {
        const { //id,
            name,
            email, 
            comment,
            rating,
            userId,
            driverId } = req.body;
        var newFeedback = new Feedback({
            //id,
            name,
            email, 
            comment,
            rating,
            userId,
            driverId
        });

//User can also choose the most suitable driver by their ratings

        const driver = await Driver.findById(driverId);

        if (!driver) {
            res.status(400).send('Invalid DriverId')
            return false;
        }

        const user = await User.findById(userId);

        if (!user) {
            res.status(400).send('Invalid userId')
            return false;
        }

        const newTotalRate = driver.rating * driver.noOfRaters + parseInt(rating);
        const newTotalRaters = driver.noOfRaters + 1;
        const newRating = newTotalRate / newTotalRaters;

        driver.rating = newRating;
        driver.noOfRaters = newTotalRaters;

        const updatedDriver = await Driver.findByIdAndUpdate(driverId, driver);

        if (!updatedDriver) {
            res.status(500).send('Driver rating updating failed')
            return false;
        }
//// give some feedback to driver and view the drivers's previous feedback to the user
        const savedNewFeedback = await newFeedback.save();

        if (!savedNewFeedback) {
            res.status(500).send('Feedback adding failed')
            return false;
        } else {
            res.json("Feedback Added.");
        }
    } catch (err) {
        res.status(500).send(err.message || 'Internal server error');
    }
}

exports.GetAll = async (req, res) => {
    Feedback.find().then((feedbacks) => {
        res.json(feedbacks);
    }).catch((err) => {
        res.send(err);
    });
}
exports.findById = async (req, res) => {
    var feedbackId = req.params.id;
    Feedback.findById(feedbackId).then((feedback) => {
        res.json(feedback);
    }).catch((err) => {
        res.send(err);
    });
}

