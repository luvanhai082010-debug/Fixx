// routes/game.js
const express = require('express');
const router = express.Router();
const { createNewRound, getGameHistory } = require('../service/gameEngine');
const auth = require('../middleware/auth');
const toolAccess = require('../middleware/toolAccess'); // Có thể dùng lại middleware này

// @route   POST /api/game/new_round
// @desc    Admin tạo ván bài mới
router.post('/new_round', auth, toolAccess, async (req, res) => {
    try {
        const round = await createNewRound();
        res.status(201).json({ 
            message: 'Đã tạo ván bài mới thành công.', 
            result: round.result,
            roundId: round.roundId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi máy chủ khi tạo ván bài.' });
    }
});

// @route   GET /api/game/history
// @desc    Lấy lịch sử tất cả các ván bài (Dùng cho Tool Robot)
router.get('/history', async (req, res) => {
    try {
        const history = await getGameHistory();
        res.json(history);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi máy chủ khi lấy lịch sử.' });
    }
});

module.exports = router;
