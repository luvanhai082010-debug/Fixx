// index.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectDB } = require('./db'); 

dotenv.config();
const app = express();

// --- MIDDLEWARE ---
// FIX 400: Đã thêm express.json()
app.use(express.json()); 
app.use(cors()); 

// --- KẾT NỐI DB ---
connectDB(); 

// --- ROUTES ---
const authRoutes = require('./routes/auth'); 
const adminRoutes = require('./routes/admin'); 
const gameRoutes = require('./routes/game'); 
const toolRoutes = require('./routes/tool'); 

app.use('/api/auth', authRoutes); 
app.use('/api/admin', adminRoutes);
app.use('/api/game', gameRoutes);
app.use('/api/tool', toolRoutes); 

// Route Gốc (Health Check)
app.get('/', (req, res) => {
    res.send('Baccarat Admin API Server đang hoạt động ổn định với SQLite!');
});

// --- KHỞI ĐỘNG SERVER ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server đang chạy trên cổng ${PORT}`));
