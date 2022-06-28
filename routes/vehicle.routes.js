const vehicleController = require("../controller/vehicle.controller");


var router = require("express").Router();


router.get("/", (req, res) => {
  console.log("controller");
  vehicleController
    .getVehicles(req.query.limit,req.query.skip)
    .then((d) => {
      res.send(d);
    })
    .catch((e) => {
      console.error(e);
      res.status(500).send(e);
    });
});



module.exports = router;
