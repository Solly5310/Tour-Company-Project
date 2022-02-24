const fs = require('fs');
const Tour = require(`../models/tourModel.js`);

exports.checkId = (req, res, next, val) => {
  console.log('here is ' + val);

  if (req.params.id * 1 > tours.length)
    //ends the http request through return
    return res.status(400).json({ status: 'na' });

  next();
};

exports.checkBody = (req, res, next) => {
  console.log(req.body);
  body = req.body;
  if (!body.name || !body.price) {
    return res
      .status(400)
      .json({ status: 'Fail', message: 'no price or name' });
  }
  next();
};

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAT: req.requestTime,
    /*results: //tours.length,
    data: {
      tours,
    },
    */
  });
};

exports.getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;

  //const tour = tours.find((el) => el.id === id);

  /*
    if (id > tours.length) {
      return res.status(404).json({ status: 'fail', message: 'Invalid id' });
    }
    */
  res.status(200).json({
    status: 'success',
    tour,
    //data: {
    //  tours,
    //},
  });
};

exports.createTour = (req, res) => {
  //console.log(req.body);
  //const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs
    .writeFile

    /*
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
    */
    ();
};

exports.updateTour = (req, res) => {
  console.log(req.body);

  res.status(200).json({
    status: 'success',
    tour: '<Updated tour here...>',
  });
};

exports.deleteTour = (req, res) => {
  console.log(req.body);

  res.status(204).json({
    status: 'success',
    data: 'Null',
  });
};

/*
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);
*/
