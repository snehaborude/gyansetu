const Feedback = require('../models/Feedback');
const Donation = require('../models/Donation');

// @desc    Create gratitude feedback for a donation
// @route   POST /api/feedback
// @access  Private (NGO)
const createFeedback = async (req, res) => {
    try {
        const { donationId, message } = req.body;

        if (!donationId || !message) {
            return res.status(400).json({ message: 'Please provide donationId and message' });
        }

        const donation = await Donation.findById(donationId);
        if (!donation) {
            return res.status(404).json({ message: 'Donation not found' });
        }

        // Only the assigned NGO can send feedback
        if (!donation.ngo || donation.ngo.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You are not authorized to send feedback for this donation' });
        }

        // Only allowed for delivered donations
        if (donation.status !== 'Delivered') {
            return res.status(400).json({ message: 'You can only send a gratitude note once the book is delivered' });
        }

        // Prevent duplicate feedback
        const existingFeedback = await Feedback.findOne({ donation: donationId });
        if (existingFeedback) {
            return res.status(400).json({ message: 'You have already sent a thank you note for this donation' });
        }

        const feedback = await Feedback.create({
            donation: donationId,
            donor: donation.donor,
            ngo: req.user.id,
            message,
        });

        res.status(201).json(feedback);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get gratitude feedback sent to a donor
// @route   GET /api/feedback/donor
// @access  Private (Donor)
const getFeedbackForDonor = async (req, res) => {
    try {
        const feedbacks = await Feedback.find({ donor: req.user.id })
            .populate('ngo', 'name city')
            .populate('donation', 'bookName category');

        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get feedback sent by an NGO
// @route   GET /api/feedback/ngo
// @access  Private (NGO)
const getFeedbackFromNGO = async (req, res) => {
    try {
        const feedbacks = await Feedback.find({ ngo: req.user.id })
            .populate('donation', 'bookName');

        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createFeedback,
    getFeedbackForDonor,
    getFeedbackFromNGO
};
