const router = require('express').Router();
let FeedbackController = require('../controller/feedback.controller');

router.route('/').get(FeedbackController.getByDriverId);

router.route('/add').post(FeedbackController.add);

router.route('/getByDriverId/:driverId').get(FeedbackController.getByDriverId);

router.route('/:id').get(FeedbackController.findById);

module.exports = router;