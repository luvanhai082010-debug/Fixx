// service/gameEngine.js
const Result = require('../models/Result'); 

// Hàm tạo kết quả ván bài ngẫu nhiên ('P', 'B', 'T')
const generateRandomResult = () => {
    const choices = ['P', 'B', 'T']; // Player, Banker, Tie
    const weights = [0.45, 0.45, 0.1]; // Tỉ lệ xấp xỉ
    const rand = Math.random();
    let cumulativeWeight = 0;

    for (let i = 0; i < choices.length; i++) {
        cumulativeWeight += weights[i];
        if (rand < cumulativeWeight) {
            return choices[i];
        }
    }
    return 'B'; // Giá trị mặc định
};

// @desc    Tạo ván bài mới và lưu vào DB
const createNewRound = async () => {
    const lastResult = await Result.findOne({
        order: [['roundId', 'DESC']],
        attributes: ['roundId']
    });

    const newRoundId = lastResult ? lastResult.roundId + 1 : 1;
    const result = generateRandomResult(); 

    const newRound = await Result.create({
        roundId: newRoundId,
        result: result,
    });

    return { result: result, roundId: newRoundId };
};

// @desc    Lấy lịch sử game dưới dạng chuỗi
const getGameHistory = async () => {
    const results = await Result.findAll({
        order: [['roundId', 'ASC']],
        attributes: ['result']
    });

    // Chuyển mảng kết quả thành chuỗi: "PBPBT..."
    const historyString = results.map(r => r.result).join('');

    return { results: historyString, count: results.length };
};

module.exports = { createNewRound, getGameHistory };
