const express = require('express');
const router = express.Router();

const getAllUsers = (req, res) => {
  console.log('Hello');
  res.status(200).json({ status: 'success' });
};

const createUser = (req, res) => {
  console.log('yep');
  res.status(200).json({ status: 'success' });
};

const getUser = (req, res) => {
  console.log('yep');
  res.status(200).json({ status: 'success' });
};

const updateUser = (req, res) => {
  console.log('yep');
  res.status(200).json({ status: 'success' });
};

const deleteUser = (req, res) => {
  console.log('yep');
  res.status(200).json({ status: 'success' });
};

router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
