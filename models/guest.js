const mongoose = require('mongoose');

const guestSchema = mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    sex: { type: Boolean, required: true }, // True -> M --- False -> F
    isAdult: { type: Boolean, required: true },
    isRelative: { type: Boolean, required: true },
    isDivorced: { type: Boolean, deafult: false },
    isFamily: { type: Boolean, default: false },
    isCouple: { type: Boolean, default: false },
    side: {
        type: String,
        enum: ['GROOM', 'BRIDE', 'COMMON'],
        required: true
    },
    relativeType: {
        type: String,
        enum: ["MOTHER", "FATHER", "SISTER", "BROTHER", "GRANMOTHER", "GRANDFATHER", "UNCLE", "AUNT", "COUSIN", "NEPHEW"]
    },
    husbandOf: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Guest'
    },
    wifeOf: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Guest'
    },
    childOf: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Guest'
    },
    girlfriendOf: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Guest'
    },
    boyfriendOf: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Guest'
    },
    allergies: {
        type: String
    },
    confirmed: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Guest', guestSchema, 'guests');