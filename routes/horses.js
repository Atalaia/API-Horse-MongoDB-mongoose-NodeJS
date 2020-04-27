var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const HorseModel = require('../models/Horse');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/checkAuth');

/* GET all horses listing. */
router.get('/', (req, res, next) => {
    HorseModel.find((err, horses) => {
        if (err) {
            res.status(500).json(err);
            return next(err);
        }
        res.status(200).json(horses);
    })
});

//GET ALL HORSES PROTECTED
router.get('/protected', checkAuth, (req, res, next) => {
    HorseModel.find((err, horses) => {
        if (err) {
            res.status(500).json(err);
            return next(err);
        }
        res.status(200).json(horses);
    })
});

/* GET a horse. */
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    HorseModel.findById(id, (err, horse) => {
        if (err) {
            res.status(500).json(err);
            return next(err);
        }
        res.status(200).json(horse);
    })
});

/* GET a horse ranking. */
router.get('/ranking/:id', (req, res, next) => {
    const id = req.params.id;
    HorseModel.findById(id, (err, horse) => {
        if (err) {
            res.status(500).json(err);
            return next(err);
        }
        res.status(200).json(horse.ranking);
    })
});

//ADD A HORSE
router.post('/addHorse', async (req, res) => {
    try {
        const testHorse = await HorseModel.find({ certificate: req.body.certificate });
        if (testHorse.length !== 0) {
            return res.status(409).json({ message: 'This horse already exists' });
        }
        const newHorse = new HorseModel({
            name: req.body.name,
            breed: req.body.breed,
            gender: req.body.gender,
            age: req.body.age,
            ranking: req.body.ranking,
            owner: req.body.owner,
            certificate: req.body.certificate,
        });
        const createdHorse = await newHorse.save();
        res.status(201).json(createdHorse);
    }
    catch (error) {
        res.status(500).json({ message: error });
        res.end();
    }
});

// ADD A HORSE PROTECTED
router.post('/addHorse/protected', checkAuth, async (req, res) => {
    try {
        const testHorse = await HorseModel.find({ certificate: req.body.certificate });
        if (testHorse.length !== 0) {
            return res.status(409).json({ message: 'This horse already exists' });
        }
        const newHorse = new HorseModel({
            name: req.body.name,
            breed: req.body.breed,
            gender: req.body.gender,
            age: req.body.age,
            ranking: req.body.ranking,
            owner: req.body.owner,
            certificate: req.body.certificate,
        });
        const createdHorse = await newHorse.save();
        res.status(201).json(createdHorse);
    }
    catch (error) {
        res.status(500).json({ message: error });
        res.end();
    }
});

// DELETE A HORSE PROTECTED
router.delete('/deleteHorse/protected/:id', checkAuth, async (req, res) => {
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
});

// UPDATE A HORSE PROTECTED
router.put('/updateHorse/protected/:id', checkAuth, (req, res, next) => {
    const id = req.params.id;
    const updatedHorse = req.body;
    HorseModel.findByIdAndUpdate(id, updatedHorse, (err, horse) => {
        if (err) return next(err)
        res.json({ message:'Horse updated successfully'});
    })
})

//ANOTHER WAY TO ADD A PRIZE
router.post('/ranking/:id', checkAuth, (req, res, next) => {
    const id = req.params.id;
    const newRanking = req.body;
    //$push: proprietaire de mongoose qui dit que dans le champ prize il va pusher newPrize
    Horse.findByIdAndUpdate(id, { $push: { "ranking": newRanking } }, (err, horse) => {
        if (err) return next(err);
        res.json({ message: "Prix bien ajoute" });
    });
});

module.exports = router;
