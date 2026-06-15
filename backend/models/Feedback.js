const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    donation: {
        type: mongoose.Schema.ObjectId,
        ref: 'Donation',
        required: true,
    },
    donor: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    ngo: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    message: {
        type: String,
        required: [true, 'Please add a message of gratitude'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Feedback', feedbackSchema);
