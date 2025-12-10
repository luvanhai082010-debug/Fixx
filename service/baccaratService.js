// service/baccaratService.js

// CHÚ Ý: THAY THẾ URL DƯỚI ĐÂY BẰNG URL RENDER MỚI CỦA BẠN
const GAME_HISTORY_API = 'YOUR_NEW_RENDER_API_URL/api/game/history'; 

let lastPrediction = { 
    prediction: 'WAIT', 
    reason: 'Tool Robot đang khởi động và chờ dữ liệu Game.',
    timestamp: 0 
};

function simplePredictor(historyString) {
    // Logic dự đoán đã được cung cấp trước đó (giữ nguyên)
    const filteredResults = historyString.replace(/T/g, '').slice(-5);
    const len = filteredResults.length;
    // ... (Thêm logic simplePredictor hoàn chỉnh của bạn vào đây)
    return { prediction: 'D', reason: 'Dự đoán đơn giản.' }; // Placeholder
}

async function updatePrediction() {
    try {
        const url = `${GAME_HISTORY_API}?t=${Date.now()}`; 
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`API Game trả về lỗi: ${response.status}`);
        }
        
        const data = await response.json(); 
        const historyString = data.results || ''; 
        
        if (historyString.length >= 5) { 
             const newPrediction = simplePredictor(historyString);
             lastPrediction = { ...newPrediction, timestamp: Date.now() };
        } else {
             lastPrediction = { 
                prediction: 'NẠP DATA', 
                reason: `Cần ít nhất 5 ván bài để phân tích. Hiện tại có ${historyString.length} ván.`, 
                timestamp: Date.now() 
             };
        }
    } catch (error) {
        console.error('Lỗi khi cập nhật dự đoán Tool:', error.message);
        lastPrediction = { 
            prediction: 'LỖI', 
            reason: `Lỗi kết nối/xử lý API Game: ${error.message}`, 
            timestamp: Date.now() 
        };
    }
}

// LƯU Ý: ĐÃ VÔ HIỆU HÓA TẠM THỜI ĐỂ TRÁNH CRASH LOOP
// Bạn có thể kích hoạt lại sau khi Server ổn định và kiểm tra API thành công.
// setInterval(updatePrediction, 5000); 
// updatePrediction(); 

function getPrediction() {
    return lastPrediction;
}

module.exports = { getPrediction };
