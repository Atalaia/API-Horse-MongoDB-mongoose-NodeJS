const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');

const owner_controller = require('../controllers/owner.controller');

router.get('/', owner_controller.owner_list);
router.get('/:id', owner_controller.owner_detail);
router.post('/add', checkAuth, owner_controller.owner_add);
router.delete('/delete/:id', checkAuth, owner_controller.owner_delete);
router.put('/:id', checkAuth, owner_controller.owner_update);

module.exports = router;