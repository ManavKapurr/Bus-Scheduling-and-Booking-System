const BusModel = require('../models/Bus')
const mongoose = require('mongoose');
const Bus = mongoose.model("Bus");



// 


exports.create = async (req, res) => {
    const {
        busNumber,
        companyName,
        busType,
        startCity,
        destination,
        departTime,
        departDate,
        pricePerSeat,
        seatsRow,
        seatsCol,
        driverName,
        driverNumber
    } = req.body;

    const total = seatsRow * seatsCol;
    var ForEverySeatArr = new Array(total).fill(0);
    const bus = new BusModel({
        busNumber,
        companyName,
        busType,
        startCity,
        destination,
        departTime,
        departDate,
        pricePerSeat,
        seatsRow,
        seatsCol,
        totalSeats: total,
        availableSeats: total,
        ForEverySeat: ForEverySeatArr,

        "driver.name": driverName,
        "driver.phoneNumber": driverNumber,

    })
    await Bus.findOne({
            busNumber: busNumber,
            departDate: departDate,
            departTime: departTime
        })
        .then((savedBus) => {
            if (savedBus) {
                return res.status(422).json({
                    error: "Bus already exists with that route"
                })
            }
            bus.save()
                .then(data => {
                    res.send({
                        message: "Bus schedule created successfully!!",
                        data: data
                    });

                }).catch(err => {
                    res.status(500).send({
                        message: "Repeated Values"
                    });
                });

        })
        .catch(err => {
            console.log(err)
        })


};

exports.update = async (req, res) => {
    if (!req.body) {
        re.status(400).send({
            message: "Data cannot be empty"
        })
    }
    const id = req.params.id;
    await BusModel.findById(id
        //     , {$set:{
        //    ForEverySeat: req.body.ForEverySeat,
        //  }}
    ).then(bus => {
        if (!bus) {
            res.status(404).send({
                message: "Bus not found."
            })
        } else {
            bus.ForEverySeat = req.body.ForEverySeat;
            bus.save();
            return res.status(200).json({
                message: 'Bus edited successfully!',
                data: bus
            });

        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });

    })
}

exports.updateIdAll = async (req, res) => {
    if (!req.body) {
        re.status(400).send({
            message: "Data cannot be empty"
        })
    }
    const id = req.params.id;
    await BusModel.findById(id
        //     , {$set:{
        //    ForEverySeat: req.body.ForEverySeat,
        //  }}
    ).then(bus => {
        if (!bus) {
            res.status(404).send({
                message: "Bus not found."
            })
        } else {
                bus.busNumber = req.body.busNumber,
                bus.companyName = req.body.companyName,
                bus.busType = req.body.busType,
                bus.startCity = req.body.startCity,
                bus.destination = req.body.destination,
                bus.departTime = req.body.departTime,
                bus.departDate = req.body.departDate,
                bus.pricePerSeat = req.body.pricePerSeat,
                bus.seatsRow = req.body.seatsRow,
                bus.seatsCol = req.body.seatsCol,
                bus.totalSeats = bus.seatsRow * bus.seatsCol,
                bus.availableSeats = bus.seatsRow * bus.seatsCol,
                bus.ForEverySeat = new Array(bus.totalSeats).fill(0),

                bus.save();
            return res.status(200).json({
                message: 'Bus edited successfully!',
                data: bus
            });

        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });

    })
}

exports.destroy = async (req, res) => {
    await BusModel.findByIdAndRemove(req.params.id).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Bus not found.`
            });
        } else {
            // res.send({
            //     message: "Bus deleted successfully!"
            // });
            res.json(data);
        }

    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });


}

exports.findById = async (req, res) => {
    try {
        const bus = await
        BusModel.findById(req.params.id);
        res.status(200).json(bus);
        console.log(bus);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
};

exports.findByCity = async (req, res) => {
    try {
        const bus = await
        BusModel.find({
            startCity: req.body.startCity,
            destination: req.body.destination
        });
        res.status(200).json(bus);
        console.log(bus);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
};

exports.findByDate = async (req, res) => {
    try {
        const bus = await
        BusModel.find({
            departDate: req.body.departDate
        });
        res.status(200).json(bus);
        console.log(bus);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
};


exports.findByDateAndCity = async (req, res) => {
    try {
        const bus = await
        BusModel.find({
            departDate: req.params.date,
            startCity: req.params.start,
            destination: req.params.dest
        });
        res.status(200).json(bus);
        console.log(bus);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
};



exports.findAll = async (req, res) => {
    try {
        const bus = await BusModel.find();
        res.status(200).json(bus);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
};