"use strict";

var BusModel = require('../models/Bus');

var mongoose = require('mongoose');

var Bus = mongoose.model("bus"); // 

exports.create = function _callee(req, res) {
  var _req$body, busNumber, companyName, busType, startCity, destination, departTime, departDate, pricePerSeat, seatsRow, seatsCol, driverName, driverNumber, total, ForEverySeatArr, bus;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, busNumber = _req$body.busNumber, companyName = _req$body.companyName, busType = _req$body.busType, startCity = _req$body.startCity, destination = _req$body.destination, departTime = _req$body.departTime, departDate = _req$body.departDate, pricePerSeat = _req$body.pricePerSeat, seatsRow = _req$body.seatsRow, seatsCol = _req$body.seatsCol, driverName = _req$body.driverName, driverNumber = _req$body.driverNumber;
          total = seatsRow * seatsCol;
          ForEverySeatArr = new Array(total).fill(0);
          bus = new BusModel({
            busNumber: busNumber,
            companyName: companyName,
            busType: busType,
            startCity: startCity,
            destination: destination,
            departTime: departTime,
            departDate: departDate,
            pricePerSeat: pricePerSeat,
            seatsRow: seatsRow,
            seatsCol: seatsCol,
            totalSeats: total,
            availableSeats: total,
            ForEverySeat: ForEverySeatArr,
            "driver.name": driverName,
            "driver.phoneNumber": driverNumber
          });
          _context.next = 6;
          return regeneratorRuntime.awrap(Bus.findOne({
            busNumber: busNumber,
            departDate: departDate,
            departTime: departTime
          }).then(function (savedBus) {
            if (savedBus) {
              return res.status(422).json({
                error: "Bus already exists with that route"
              });
            }

            bus.save().then(function (data) {
              res.send({
                message: "Bus schedule created successfully!!",
                data: data
              });
            })["catch"](function (err) {
              res.status(500).send({
                message: err.message || "Some error occurred while creating bus schedule"
              });
            });
          })["catch"](function (err) {
            console.log(err);
          }));

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.update = function _callee2(req, res) {
  var id;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (!req.body) {
            re.status(400).send({
              message: "Data cannot be empty"
            });
          }

          id = req.params.id;
          _context2.next = 4;
          return regeneratorRuntime.awrap(BusModel.findById(id //     , {$set:{
          //    ForEverySeat: req.body.ForEverySeat,
          //  }}
          ).then(function (bus) {
            if (!bus) {
              res.status(404).send({
                message: "Bus not found."
              });
            } else {
              bus.ForEverySeat = req.body.ForEverySeat;
              bus.save();
              return res.status(200).json({
                message: 'Book edited successfully!',
                data: bus
              });
            }
          })["catch"](function (err) {
            res.status(500).send({
              message: err.message
            });
          }));

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.destroy = function _callee3(req, res) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(BusModel.findByIdAndRemove(req.params.id).then(function (data) {
            if (!data) {
              res.status(404).send({
                message: "Bus not found."
              });
            } else {
              // res.send({
              //     message: "Bus deleted successfully!"
              // });
              res.json(data);
            }
          })["catch"](function (err) {
            res.status(500).send({
              message: err.message
            });
          }));

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.findById = function _callee4(req, res) {
  var bus;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(BusModel.findById(req.params.id));

        case 3:
          bus = _context4.sent;
          res.status(200).json(bus);
          console.log(bus);
          _context4.next = 11;
          break;

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          res.status(404).json({
            message: _context4.t0.message
          });

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.findByCity = function _callee5(req, res) {
  var bus;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(BusModel.find({
            startCity: req.body.startCity,
            destination: req.body.destination
          }));

        case 3:
          bus = _context5.sent;
          res.status(200).json(bus);
          console.log(bus);
          _context5.next = 11;
          break;

        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](0);
          res.status(404).json({
            message: _context5.t0.message
          });

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.findByDate = function _callee6(req, res) {
  var bus;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(BusModel.find({
            departDate: req.body.departDate
          }));

        case 3:
          bus = _context6.sent;
          res.status(200).json(bus);
          console.log(bus);
          _context6.next = 11;
          break;

        case 8:
          _context6.prev = 8;
          _context6.t0 = _context6["catch"](0);
          res.status(404).json({
            message: _context6.t0.message
          });

        case 11:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.findByDateAndCity = function _callee7(req, res) {
  var bus;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(BusModel.find({
            departDate: req.body.departDate,
            startCity: req.body.startCity,
            destination: req.body.destination
          }));

        case 3:
          bus = _context7.sent;
          res.status(200).json(bus);
          console.log(bus);
          _context7.next = 11;
          break;

        case 8:
          _context7.prev = 8;
          _context7.t0 = _context7["catch"](0);
          res.status(404).json({
            message: _context7.t0.message
          });

        case 11:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.findAll = function _callee8(req, res) {
  var bus;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return regeneratorRuntime.awrap(BusModel.find());

        case 3:
          bus = _context8.sent;
          res.status(200).json(bus);
          _context8.next = 10;
          break;

        case 7:
          _context8.prev = 7;
          _context8.t0 = _context8["catch"](0);
          res.status(404).json({
            message: _context8.t0.message
          });

        case 10:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 7]]);
};