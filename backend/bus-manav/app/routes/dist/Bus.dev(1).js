"use strict";

var express = require('express');

var BusController = require('../Controllers/Bus');

var router = express.Router(); // Creating a bus

router.post('/addBus', BusController.create); // Getting All Bus

router.get('/getAllBus', BusController.findAll); // Getting Bus By Parameter

router.get('/getBusById/:id', BusController.findById);
router.get('/getBusByCity', BusController.findByCity);
router.get('/getBusByDate', BusController.findByDate);
router.get('/getBusByDateAndCity', BusController.findByDateAndCity); // Update

router.put('/selectseats/:id', BusController.update); // Delete

router["delete"]('/deletebusById/:id', BusController.destroy);
module.exports = router;