const mongoose = require('mongoose');
const OwnerModel = require('../models/Owner');

// GET ALL OWNERS
exports.owner_list = (req, res, next) => {
    OwnerModel.find((err, owners) => {
        if (err) {
            return next(err);
        }
        res.json(owners);
    })
}

// GET A SINGLE OWNER
exports.owner_detail = (req, res, next) => {
    const id = req.params.id;
    OwnerModel.findById(id, (err, owner) => {
        if (err) return next(err)
        res.json(owner);
    })
}

// ADD OWNER (PROTECTED ROUTE - AUTH REQUIRED)
exports.owner_add = (req, res, next) => {
    OwnerModel.find({ email: req.body.email })
        .then(data => {
            if (data.length !== 0) {
                res.status(409).json({ message: 'This owner already exists' });
                res.end();
            }
        })
        .catch(err => {
            res.json(err);
            res.end();
        });

    const newOwner = req.body;
    OwnerModel.create(newOwner, (err, owner) => {
        if (err) return next(err)
        res.json(owner);
    })
}

// DELETE OWNER (PROTECTED ROUTE - AUTH REQUIRED)
exports.owner_delete = (req, res, next) => {
    const id = req.params.id;
    OwnerModel.findByIdAndDelete(id, (err, owner) => {
        if (err) return next(err)
        res.json(owner);
    })
}

// UPDATE OWNER (PROTECTED ROUTE - AUTH REQUIRED)
exports.owner_update = (req, res, next) => {
    const id = req.params.id;
    const updatedOwner = req.body;
    OwnerModel.findByIdAndUpdate(id, updatedOwner, (err, owner) => {
        if (err) return next(err)
        res.json(updatedOwner);
    })
}