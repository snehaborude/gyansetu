const express = require('express');
const router = express.Router();
const { 
    createFeedback, 
    getFeedbackForDonor, 
    getFeedbackFromNGO 
} = require('../controllers/feedbackController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', protect, authorize('ngo', 'admin'), createFeedback);
router.get('/donor', protect, authorize('donor', 'admin'), getFeedbackForDonor);
router.get('/ngo', protect, authorize('ngo', 'admin'), getFeedbackFromNGO);

module.exports = router;
