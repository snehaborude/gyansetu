const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
    createDonation,
    getDonations,
    updateDonationStatus,
    getStats,
    getTopDonors,
} = require('../controllers/donationController');
const { protect, authorize } = require('../middleware/authMiddleware');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage });

router.get('/stats', getStats);
router.get('/top-donors', getTopDonors);

router.post('/', protect, authorize('donor', 'admin'), upload.single('image'), createDonation);
router.get('/', protect, getDonations);
router.put('/:id/status', protect, authorize('ngo', 'admin'), updateDonationStatus);

module.exports = router;
