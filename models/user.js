const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true},
    pwd: { type: String, required: true },
    wedding: {
        type: {
            groom: {
                type: {
                    name: {
                        type: String,
                        required: true
                    },
                    surname: {
                        type: String,
                        required: true
                    }
                },
                required: true
            },
            bride: {
                type: {
                    name: {
                        type: String,
                        required: true
                    },
                    surname: {
                        type: String,
                        required: true
                    }
                },
                required: true
            },
            date: { type: Date, required: true },
            location: { type: String, required: true },
            colors: { type: [String] },
            guests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Guest'}]
        }
    }
});

module.exports = mongoose.model('User', userSchema, "users");;