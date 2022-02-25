const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require(`${__dirname}/app.js`);

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

const port = process.env.PORT;

app.listen(port, () => {
  console.log('listening on port');
});
