/*const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel.js');

dotenv.config({ path: './../../config.env' });

const DB = process.env.DataBase.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    console.log('db connection success');
  });

// Read Json file

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

// import data into DB

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('data succesfully loaded');
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit();
  }
};

//Delete all data from collection

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('data deleted');
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

if (process.argv[2] == '--import') {
  importData();
} else if ((process.argv[2] = '--delete')) {
  deleteData();
}

console.log(process.argv);
*/
