const express = require ( 'express' )
const BusController = require ( '../Controllers/Bus' )
const router = express.Router();

// Creating a bus
router.post( '/addBus' , BusController.create);

// Getting All Bus
router.get( '/getAllBus' , BusController.findAll);

// Getting Bus By Parameter
router.get( '/getBusById/:id' , BusController.findById);
router.get( '/getBusByCity' , BusController.findByCity);
router.get( '/getBusByDate' , BusController.findByDate);
// router.get( '/getBusByDateAndCity' , BusController.findByDateAndCity);
router.get( '/getBusByDateAndCity/:start/:dest/:date' , BusController.findByDateAndCity);

// Update
router.put( '/selectseats/:id', BusController.update);
router.put( '/editBusAll/:id', BusController.updateIdAll);

// Delete
router.delete( '/deletebusById/:id' , BusController.destroy);
module .exports = router
// 