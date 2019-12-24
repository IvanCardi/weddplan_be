const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const wedding = require('../routes/wedding');
const checkAuth = require('../middlewares/check-auth');

const User = require('../models/user');

router.post('/signup', (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                res.status(409).json({
                    message: 'Email already exists'
                });
            } else {
                bcrypt.hash(req.body.pwd, 10, (err, hash) => {
                    if (err) {
                        next(err);
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId,
                            name: req.body.name,
                            surname: req.body.surname,
                            email: req.body.email,
                            pwd: hash
                        });
                        user.save()
                            .then(result => {
                                res.status(201).json({
                                    message: 'User Created'
                                });
                            })
                            .catch(error => {
                                next(error);
                            });
                    }
                });
            }
        })
});

router.post('/login', (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                res.status(401).json({
                    message: 'Auth failed'
                });
            }
            bcrypt.compare(req.body.pwd, user[0].pwd, (err, result) => {
                if (err) {
                    res.status(200).json({
                        message: 'Auth successful'
                    });
                }
                if (result) {
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    }, process.env.JWT_KEY, {
                        expiresIn: "1h"
                    });
                    res.status(200).json({
                        message: 'Auth successful',
                        token: token
                    });
                } else {
                    res.status(401).json({
                        message: 'Auth failed'
                    })
                }
            });
        })
        .catch(error => {
            next(error);
        })

});

router.use('/wedding', checkAuth, wedding)

module.exports = router;