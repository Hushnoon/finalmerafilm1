'use strict';

var express = require('express');
var controller = require('./theater.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
//router.get('/:tid/slot/:sid', controller.showSeat);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.delete('/:id/slot/:sid', controller.destroySlot);
router.put('/:id/:sid/:dt', controller.updateSeats);
module.exports = router;
