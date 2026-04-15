const express = require('express');
const router = express.Router();
const {
    createRequest,
    getRequests,
    updateRequest,
} = require('../controllers/requestController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', getRequests);
router.post('/', protect, authorize('ngo', 'admin'), createRequest);
router.put('/:id', protect, authorize('ngo', 'admin'), updateRequest);

module.exports = router;
