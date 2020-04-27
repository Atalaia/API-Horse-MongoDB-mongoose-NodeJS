var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const UserModel = require('../models/User');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/checkAuth');

/* GET users listing. */
router.get('/', (req, res, next) => {
  UserModel.find((err, users) => {
    if (err) {
      res.status(500).json(err);
      return next(err);
    }
    res.status(200).json(users);
  })
});

//GET USERS PROTECTED
router.get('/protected', checkAuth, (req, res, next) => {
  UserModel.find((err, users) => {
    if (err) {
      res.status(500).json(err);
      return next(err);
    }
    res.status(200).json(users);
  })
});

// ADD USER. 
router.post('/signin', async (req, res) => {
  try {
    const testUser = await UserModel.find({ email: req.body.email });
    if (testUser.length !== 0) {
      return res.status(409).json({ message: 'Ton email est deja utilise' });
    }
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new UserModel({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword
    });
    const createdUser = await newUser.save();
    res.status(201).json(createdUser);
  }
  catch (error) {
    res.status(500).json({ message: error });
    res.end();
  }
});

//LOGIN
router.post('/login', (req, res) => {
  UserModel.findOne({ email: req.body.email }).exec()
    .then(user => {
      if (user) {
        verifyPassword(user, req, res);
      }
      else {
        res.json({ message: "Mauvais email ou password" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    })
});

const verifyPassword = (user, req, res) => {
  bcrypt.compare(req.body.password, user.password, (err, result) => {
    if (err) return res.status(500).json(err)
    else {
      if (result) return getToken(user, res)
      else return res.json({ message: "You fail" });
    }
  })
}

const getToken = (user, res) => {
  const token = jwt.sign({ email: user.email, userId: user._id }, process.env.JWT_KEY, { expiresIn: "2h" })
  res.json({
    message: "You win - auth ok",
    user,
    token: token
  })
}

module.exports = router;
