const mongoose = require('mongoose');
const HorseModel = require('../models/Horse');
const OwnerModel = require('../models/Owner');

// GET ALL HORSES LIST
exports.horse_list = (req, res, next) => {
    HorseModel.find((err, horses) => {
        if (err) {
            res.status(500).json(err);
            return next(err);
        }
        res.status(200).json(horses);
    })
}

// GET A HORSE
exports.horse_detail = (req, res, next) => {
    const id = req.params.id;
    HorseModel.findById(id, (err, horse) => {
        if (err) {
            res.status(500).json(err);
            return next(err);
        }
        res.status(200).json(horse);
    })
}

// GET A HORSE PRIZE
exports.horse_prize = (req, res, next) => {
    const id = req.params.id;
    HorseModel.findById(id, (err, horse) => {
        if (err) {
            res.status(500).json(err);
            return next(err);
        }
        res.status(200).json(horse.prize);
    })
}

// GET FULL DETAIL OF HORSE WITH OWNER
exports.horse_full = (req, res, next) => {
    const id = req.params.id;
    HorseModel.findById(id, (err, horse) => {
        if (err) return next(err)
        OwnerModel.findById(horse.owner, (err, owner) => {
            if (err) return next(err)
            horse.owner = owner;
            res.json(horse);
        })
    })
}

// ADD A HORSE (PROTECTED ROUTE - AUTH REQUIRED)
exports.horse_add = async (req, res) => {
    try {
        const testHorse = await HorseModel.find({ certificate: req.body.certificate });
        if (testHorse.length !== 0) {
            return res.status(409).json({ message: 'This horse already exists' });
        }
        const newHorse = new HorseModel({
            name: req.body.name,
            age: req.body.age,
            gender: req.body.gender,
            breed: req.body.breed,
            owner: req.body.owner,
            prize: req.body.prize,
            certificate: req.body.certificate,
        });
        const createdHorse = await newHorse.save();
        res.status(201).json(createdHorse);
    }
    catch (error) {
        res.status(500).json({ message: error });
        res.end();
    }
}

// DELETE A HORSE (PROTECTED ROUTE - AUTH REQUIRED)
exports.horse_delete = async (req, res) => {
    try {
        const id = req.params.id;
        HorseModel.findByIdAndDelete(id, (err, horse) => {
            if (err) return next(err)
            res.json(horse);
        })
    }
    catch (error) {
        res.status(500).json({ message: error });
        res.end();
    }
}

// UPDATE A HORSE (PROTECTED ROUTE - AUTH REQUIRED)
exports.horse_update = (req, res, next) => {
    const id = req.params.id;
    const updatedHorse = req.body;
    HorseModel.findByIdAndUpdate(id, updatedHorse, (err, horse) => {
        if (err) return next(err)
        res.json({ message: 'Horse updated successfully' });
    })
}

// ADD A PRIZE TO AN EXISTING HORSE (PROTECTED ROUTE - AUTH REQUIRED)
exports.horse_add_prize = (req, res, next) => {
    const id = req.params.id;
    const newPrize = req.body;
    //$push: proprietaire de mongoose qui dit que dans le champ prize il va pusher newPrize
    HorseModel.findByIdAndUpdate(id, { $push: { "prize": newPrize } }, (err, horse) => {
        if (err) return next(err);
        res.json({ message: "Prize added successfully" });
    });
}