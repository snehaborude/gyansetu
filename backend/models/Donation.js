const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: [true, 'Please add a book name'],
    },
    category: {
        type: String,
        required: [true, 'Please add a category'],
    },
    condition: {
        type: String,
        enum: ['New', 'Like New', 'Good', 'Fair'],
        required: [true, 'Please add book condition'],
    },
    deliveryMethod: {
        type: String,
        enum: ['Pickup Request', 'Self Drop-off'],
        default: 'Pickup Request',
    },
    pickupAddress: {
        type: String,
        default: '',
    },
    city: {
        type: String,
        default: '',
    },
    pincode: {
        type: String,
        default: '',
    },
    imageUrl: {
        type: String,
        default: '',
    },
    pickupDate: {
        type: Date,
    },
    donor: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    ngo: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Picked', 'Delivered'],
        default: 'Pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Donation', donationSchema);
