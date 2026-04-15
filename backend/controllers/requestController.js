const Request = require('../models/Request');

// @desc    Create book request
// @route   POST /api/requests
// @access  Private (NGO)
const createRequest = async (req, res) => {
    try {
        const { quantity, bookType } = req.body;

        const request = await Request.create({
            quantity,
            bookType,
            city: req.user.city || '',
            pincode: req.user.pincode || '',
            ngo: req.user.id,
        });

        res.status(201).json(request);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all requests
// @route   GET /api/requests
// @access  Public
const getRequests = async (req, res) => {
    try {
        const { city } = req.query;
        let queryFilter = {};
        if (city) {
            queryFilter.city = { $regex: new RegExp(city, 'i') };
        }
        const requests = await Request.find(queryFilter).populate('ngo', 'name address city pincode phone');
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update request status
// @route   PUT /api/requests/:id
// @access  Private (NGO/Admin)
const updateRequest = async (req, res) => {
    try {
        const { status } = req.body;
        const request = await Request.findById(req.params.id);

        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }

        request.status = status;
        await request.save();

        res.status(200).json(request);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createRequest,
    getRequests,
    updateRequest,
};
