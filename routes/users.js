const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');

const user_controller = require('../controllers/user.controller');

router.get('/', user_controller.user_list);
router.get('/protected', checkAuth, user_controller.user_list_protected);
router.post('/signup', user_controller.user_signup);
router.post('/login', user_controller.user_login);

module.exports = router;
