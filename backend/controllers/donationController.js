const Donation = require('../models/Donation');
const User = require('../models/User');

// @desc    Create new donation
// @route   POST /api/donations
// @access  Private (Donor)
const createDonation = async (req, res) => {
    try {
        const { bookName, category, condition, pickupAddress, deliveryMethod, city, pincode, pickupDate } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

        const donation = await Donation.create({
            bookName,
            category,
            condition,
            pickupAddress,
            deliveryMethod,
            city,
            pincode,
            imageUrl,
            pickupDate,
            donor: req.user.id,
        });

        res.status(201).json(donation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all donations
// @route   GET /api/donations
// @access  Private (NGO/Admin)
const getDonations = async (req, res) => {
    try {
        const { city } = req.query;
        let queryFilter = {};

        if (city) {
            queryFilter.city = { $regex: new RegExp(city, 'i') };
        }

        let query;
        if (req.user.role === 'ngo' || req.user.role === 'admin') {
            query = Donation.find(queryFilter).populate('donor', 'name phone email city pincode');
        } else {
            queryFilter.donor = req.user.id;
            query = Donation.find(queryFilter).populate('ngo', 'name phone email'); // populating NGO for contact
        }

        const donations = await query;
        res.status(200).json(donations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update donation status
// @route   PUT /api/donations/:id/status
// @access  Private (NGO/Admin)
const updateDonationStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const donation = await Donation.findById(req.params.id);

        if (!donation) {
            return res.status(404).json({ message: 'Donation not found' });
        }

        // Only allow status updates by NGOs (if they accepted it) or Admin
        if (req.user.role === 'ngo') {
            donation.ngo = req.user.id;
        }
        
        donation.status = status;
        await donation.save();

        res.status(200).json(donation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get statistics (Impact Feature)
// @route   GET /api/donations/stats
// @access  Public
const getStats = async (req, res) => {
    try {
        const totalDonated = await Donation.countDocuments({ status: 'Delivered' });
        const totalPending = await Donation.countDocuments({ status: 'Pending' });
        const totalUsers = await User.countDocuments({ role: 'donor' });
        const totalNGOs = await User.countDocuments({ role: 'ngo' });
        res.status(200).json({ totalDonated, totalPending, totalUsers, totalNGOs });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get top donors
// @route   GET /api/donations/top-donors
// @access  Public
const getTopDonors = async (req, res) => {
    try {
        const topDonors = await Donation.aggregate([
            { $match: { status: 'Delivered' } },
            { $group: { _id: '$donor', totalDonated: { $sum: 1 } } },
            { $sort: { totalDonated: -1 } },
            { $limit: 3 },
            { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user' } },
            { $unwind: '$user' },
            { $project: { _id: 0, name: '$user.name', totalDonated: 1 } }
        ]);
        res.status(200).json(topDonors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createDonation,
    getDonations,
    updateDonationStatus,
    getStats,
    getTopDonors,
};
