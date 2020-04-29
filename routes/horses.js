const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');

const horse_controller = require('../controllers/horse.controller');

router.get('/', horse_controller.horse_list);
router.get('/:id', horse_controller.horse_detail);
router.get('/prize/:id', horse_controller.horse_prize);
router.get('/full/:id', horse_controller.horse_full);
router.post('/add', checkAuth, horse_controller.horse_add);
router.delete('/delete/:id', checkAuth, horse_controller.horse_delete);
router.put('/:id', checkAuth, horse_controller.horse_update);
router.post('/prize/:id', checkAuth, horse_controller.horse_add_prize);

module.exports = router;
