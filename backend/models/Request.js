const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    ngo: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    quantity: {
        type: Number,
        required: [true, 'Please add the number of books needed'],
    },
    bookType: {
        type: String, // e.g., Educational, Storybooks, Science
        required: [true, 'Please add the type of books needed'],
    },
    city: {
        type: String,
        default: '',
    },
    pincode: {
        type: String,
        default: '',
    },
    status: {
        type: String,
        enum: ['Open', 'Fulfilled'],
        default: 'Open',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Request', requestSchema);
