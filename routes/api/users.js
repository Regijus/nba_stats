const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

// User Model
const User = require('../../models/User');

// @route POST api/users
// @desc Registration
// @access Public
router.post('/users', ({ body: { password, ...fields }}, res) => {
  console.log(fields);
  const newUser = new User({ 
    ...fields, 
    password: bcrypt.hashSync(password, 10)
  });
  newUser.save().then((user) => res.json(user));
});

module.exports = router;
