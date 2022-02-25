const Tour = require(`../models/tourModel.js`);

exports.getAllTours = async (req, res) => {
  try {
    //Filtering
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);
    //How to get a filter to take place by passing through the query object
    console.log(req.query, queryObj);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => {
      return `$${match}`;
    });

    //build the query
    //Advanced filtering
    let query = Tour.find(JSON.parse(queryStr));

    //sorting query by parameters
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);

      //sort('price' ratingsAverage)
    } else {
      query = query.sort('-createdAt');
    }

    //limiting the number of fields to query
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    //pagination
    /*
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;
    */

    // we do -1 because we want to start at the first page
    // so ifyou select page 2, you need to skip the first 10
    // so we need to calculate the skip value
    query = query.skip(0);
    query = query.limit(10);

    if (req.query.page) {
      const numTours = await Tour.countDocuments();
      if (skip >= numTours) {
        throw new Error('This page does not exist');
      }
    }

    //execute the query
    const tours = await query;

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: { tours },
    });

    //{ difficult: 'easy',duration: {$gte:5} }
    //{ duration: { gte: '5' }, difficulty: 'easy' }
    /* a query chain process
    const query = Tour.find()
      .where('duration')
      .equals(5)
      .where('difficulty')
      .equals('easy');
    */
  } catch (err) {
    res.status(404).json({ status: 'fail', message: err });
  }
};

exports.getTour = async (req, res) => {
  try {
    const id = req.params.id;
    const tour = await Tour.findById(id);

    res.status(200).json({ status: 'success', data: { tour } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err });
  }
};

exports.createTour = async (req, res) => {
  //console.log(req.body);
  //const newId = tours[tours.length - 1].id + 1;

  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: { tour: newTour },
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      status: 'success',
      data: { tour },
    });
  } catch (err) {
    res.status(404).json({ status: 'fail', message: err });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err });
  }
};

/*
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);
*/
