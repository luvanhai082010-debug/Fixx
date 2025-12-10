// routes/tool.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const toolAccess = require('../middleware/toolAccess');
const baccaratService = require('../service/baccaratService');

// @route   GET /api/tool/predict
// @desc    Lấy dự đoán mới nhất từ Tool Robot
router.get('/predict', auth, toolAccess, (req, res) => {
    try {
        const prediction = baccaratService.getPrediction();
        res.json(prediction);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi máy chủ khi lấy dự đoán.' });
    }
});

module.exports = router;
