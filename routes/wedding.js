const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res, next) => {
    const id = req.userData.userId;
    User.findById(id)
        .exec()
        .then(user => {
            if (user) {
                if (user.wedding)
                    res.status(200).json(user.wedding);
                else
                    res.status(200).json({
                        message: 'No wedding yet'
                    })
            } else {
                res.status(404).json({
                    message: 'No user found'
                });
            }
        }).catch(err => {
            next(err);
        })
});

router.patch('/', (req, res, next) => {
    const id = req.userData.userId;
    const updateObj = {};
    for (const ops of req.body)
        updateObj[ops.propName] = ops.value;
    User.updateOne({ _id: id }, { $set: updateObj })
        .exec()
        .then(wedd => {
            res.status(200).json({
                message: "Wedding updated"
            });
        })
        .catch(err => {
            next(err);
        });
});

router.delete('/', (req, res, next) => {
    const id = req.userData.userId;
    User.updateOne({ _id: id }, {
        $unset: {
            wedding: 1
        }
    }).exec().then(wedd => {
        res.status(200).json({
            message: "Wedding deleted"
        });
    }
    ).catch(err => {
        next(err);
    })
})

module.exports = router;