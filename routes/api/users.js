const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

const getToken = authorization => {
  return authorization && authorization.split(' ')[0] === "Bearer" ? authorization.split(' ')[1] : null;
};

// User Model
const User = require('../../models/User');

// @route GET api/users
// @desc Get All Users
// @access Public
router.get('/', (req, res) => {
  User.find().then(users => res.json(users));
});

// @route PUT api/users
// @desc Update user
// @access Private
router.put('/:id', ({ body: { id, username, email }, headers: { authorization } }, res) => {
  User.findById(id, (err, user) => {
    const token = getToken(authorization);
    if(token) {
      jwt.verify(token, 'key', (err, { admin, _id }) => {
        if(admin === true || _id === user._id) {
          if(user.username === username) {
            User.updateOne({ _id: id }, { $set: { email }}, () => {
              res.status(200).send(`User id(${id}) was sucessfully updated`);
            });
          } else {
            User.findOne({ username: username }, (err, user) => {
              if(user === null) {
                User.updateOne({ _id: id }, { $set: { email, username }}, () => {
                  res.status(200).send(`User id(${id}) was sucessfully updated`);
                });
              } else {
                res.status(400).send('This username already exists');
              }
            });      
          }
        } else {
          res.status(403).send('Unauthorized');
        }
      });
    }
  });
});

// @route POST api/users/activate
// @desc Activate user by id
// @access Admin
router.post('/activate', ({ body: { _id }, headers: { authorization } }, res) => {
  const token = getToken(authorization);
  if(token) {
    jwt.verify(token, 'key', (err, { admin }) => {
      if(admin === true) {
        User.updateOne({ _id }, { $set: { active: true }}, () => {
          res.status(200).send(`User id(${_id}) was sucessfully activated`);
        });
      } else {
        res.status(403).send('Unauthorized');
      }
    });
  }
});

// @route POST api/users/ban
// @desc Ban user
// @access Admin
router.post('/ban', ({ body: { _id }, headers: { authorization }}, res) => {
  const token = getToken(authorization);
  if(token) {
    jwt.verify(token, 'key', (err, { admin }) => {
      if(admin === true) {
        User.updateOne({ _id }, { $set: { banned: true }}, () => {
          res.status(200).send(`User id(${_id}) was sucessfully banned`);
        });
      } else {
        res.status(403).send('Unauthorized');
      }
    });
  }
});

// @route DELETE api/users/ban
// @desc Unban user
// @access Admin
router.delete('/ban', ({ body: { _id, headers: { Authorization } } }, res) => {
  const token = getToken(Authorization);
  if(token) {
    jwt.verify(token, 'key', (err, { admin }) => {
      if(admin === true) {
        User.updateOne({ _id }, { $set: { banned: false }}, () => {
          res.status(200).send(`User id(${_id}) was sucessfully unbanned`);
        });
      } else {
        res.status(403).send('Unauthorized');
      }
    });
  }
});

// @route POST api/users/admin
// @desc Add admin
// @access Admin
router.post('/admin', ({ body: { _id }, headers: { authorization } }, res) => {
  const token = getToken(authorization);
  if(token) {
    jwt.verify(token, 'key', (err, { admin }) => {
      if(admin === true) {
        User.updateOne({ _id }, { $set: { admin: true }}, () => {
          res.status(200).send(`User id(${_id}) is now admin`);
        });
      } else {
        res.status(403).send('Unauthorized');
      }
    });
  }
});

// @route DELETE api/users/admin
// @desc Remove admin
// @access Admin
router.delete('/admin', ({ body: { _id, headers: { Authorization } } }, res) => {
  const token = getToken(Authorization);
  if(token) {
    jwt.verify(token, 'key', (err, { admin }) => {
      if(admin === true) {
        User.updateOne({ _id }, { $set: { admin: false }}, () => {
          res.status(200).send(`User id(${_id}) is not admin anymore`);
        });
      } else {
        res.status(403).send('Unauthorized');
      }
    });
  }
});


// @route POST api/users/register
// @desc Registration
// @access Public
router.post('/register', ({ body: { password, ...fields }}, res) => {
  new User({ ...fields, password: bcrypt.hashSync(password, 10) })
    .save()
    .then(() => res.status(201).send('Registration successful'))
    .catch(() => res.status(400).send('This username already exists'));
});

// @route POST api/users/login
// @desc Login
// @access Public
router.post('/login', ({ body: { username, password } }, res) => {
  User
    .findOne({ username: username })
    .then(user => {     
      if(user && user.active === false) {
        res.status(400).send('This account is not activated yet');
      } else if(user && user.banned === true) {
        res.status(400).send('This account is banned');
      } else if(user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json(jwt.sign(user.toJSON(), 'key'));
      } else {
        res.status(400).send('Wrong credentials');      
      }       
    });
});

module.exports = router;
