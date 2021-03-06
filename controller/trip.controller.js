let Trip = require("../models/trip");
let TripHault = require("../models/trip-hault");

exports.getAll = async (req, res) => {
  Trip.find()
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.add = async (req, res) => {
  const { name, vehicleId, startTime, repeat, status, halts } = req.body;
  var startTimeInMins = getMinsByTime(startTime);
  if (!(repeat === "daily" || repeat === "weekdays" || repeat === "weekend")) {
    res.status(400).json("Invlid repeat value");
    return;
  }
  var newTrip = new Trip({
    name,
    vehicleId,
    startTime: startTimeInMins,
    repeat,
    status,
  });

  newTrip
    .save()
    .then((response) => {
      res.send(newTrip);
    })
    .catch((err) => {
      res.send();
    });
};

exports.update = async (req, res) => {
  const tripId = req.params.id;
  const { name, vehicleId, startTime, repeat, status } = req.body;
  var startTimeInMins = getMinsByTime(startTime);
  if (!(repeat === "Daily" || repeat === "Weekdays" || repeat === "Weekend")) {
    res.status(400).json("Invalid repeat value");
    return;
  }
  var updateTrip = {
    name,
    vehicleId,
    startTime: startTimeInMins,
    repeat,
    status,
  };
  Trip.findByIdAndUpdate(tripId, updateTrip)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.getAllHaults = async (req, res) => {
  const tripId = req.params.id;
  TripHault.find({ tripId })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.send(err);
    });
};

const addhalts = (exports.addHaults = async (req, res) => {
  console.log("add Halt");
  const tripId = req.params.id;
  const { name, location, timeSinceTripStart } = req.body;

  try {
    const tripExists = await Trip.exists({ _id: tripId });
    if (!tripExists) {
      throw new Error("Invalid Trip-ID");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message || "Internal Server Error!");
    return;
  }

  let locationObj = {
    type: "Point",
    coordinates: [
      parseFloat(location.longitude),
      parseFloat(location.latitude),
    ],
  };

  var newTripHault = new TripHault({
    name,
    tripId,
    timeSinceTripStart,
    location: locationObj,
  });
  newTripHault
    .save()
    .then((response) => {
      console.log("SAVED");
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

exports.updateHault = async (req, res) => {
  const tripId = req.params.id;
  const haltId = req.params.haltId;
  const { name, location, timeSinceTripStart } = req.body;

  try {
    const tripExists = await Trip.exists({ _id: tripId });
    if (!tripExists) {
      throw new Error("Invalid Trip-ID");
    }
  } catch (err) {
    res.status(500).send(err.message || "Internal Server Error!");
    return;
  }

  let locationObj = {
    type: "Point",
    coordinates: [location.longitude, location.latitude],
  };

  var updateTripHault = {
    name,
    location: locationObj,
    timeSinceTripStart,
  };
  TripHault.findByIdAndUpdate(haltId, updateTripHault)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.search = async (req, res) => {
  const { maxDistance, longitude, latitude, time } = req.query;
  let repeat = ["weekdays", "daily", "weekend"];

  TripHault.aggregate([
    [
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          distanceField: "distance",
          maxDistance: parseFloat(maxDistance) || 1000,
          query: {},
          spherical: true,
        },
      },
      {
        $lookup: {
          from: "trips",
          localField: "tripId",
          foreignField: "_id",
          as: "tripDetails",
        },
      },
      {
        $unwind: {
          path: "$tripDetails",
        },
      },
      {
        $addFields: {
          time: {
            $add: ["$timeSinceTripStart", "$tripDetails.startTime"],
          },
          repeat: "$tripDetails.repeat",
          status: "$tripDetails.status",
        },
      },
      {
        $match: {
          time: {
            $gte: getMinsByTime(time),
          },
          repeat: {
            $in: [...repeat],
          },
          status: true,
        },
      },
      {
        $group: {
          _id: "$tripId",
          distance: {
            $min: "$distance",
          },
          location: {
            $first: "$location",
          },
          name: {
            $first: "$name",
          },
          haltId: {
            $first: "$_id",
          },
          time: {
            $first: "$time",
          },
          vehicleId: {
            $first: "$tripDetails.vehicleId",
          },
        },
      },
      {
        $lookup: {
          from: "vehicles",
          localField: "vehicleId",
          foreignField: "_id",
          as: "vehicle",
        },
      },
      {
        $unwind: {
          path: "$vehicle",
        },
      },
    ],
  ])
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.send(err);
    });
};

function getMinsByTime(t) {
  try {
    // 13:10  -> 1:10pm
    const myArray = t.substring(1).split(":");
    let h = parseInt(myArray[0]);
    let m = parseInt(myArray[1]);
    let mT = h * 60 + m;
    return mT;
  } catch (err) {
    return 0;
  }
}
