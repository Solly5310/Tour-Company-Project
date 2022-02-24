const express = require('express');
const app = require('../app');
const router = express.Router();
const tourController = require(`${__dirname}/../controllers/tourController`);

router.param('id', tourController.checkId);

//so we need to create a response to check if it has the correct bodyParser
// need to check name and price property

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
