// routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 
const router = express.Router();

const generateToken = (id) => {
    // FIX JWT: Dùng process.env.JWT_SECRET (đã thêm trên Render)
    return jwt.sign({ userId: id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
};

// @route   POST /api/auth/register
// @desc    Đăng ký người dùng mới (Người dùng đầu tiên là Admin)
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Vui lòng cung cấp tên đăng nhập và mật khẩu.' });
    }

    try {
        const userExists = await User.findOne({ where: { username } });

        if (userExists) {
            return res.status(400).json({ message: 'Tên người dùng đã tồn tại.' });
        }

        const count = await User.count();
        const isAdmin = count === 0; // Tài khoản đầu tiên là Admin

        const user = await User.create({
            username,
            password,
            isAdmin,
        });

        res.status(201).json({
            id: user.id,
            username: user.username,
            isAdmin: user.isAdmin,
            token: generateToken(user.id),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi máy chủ khi đăng ký.' });
    }
});

// @route   POST /api/auth/login
// @desc    Đăng nhập người dùng
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Vui lòng cung cấp tên đăng nhập và mật khẩu.' });
    }

    try {
        const user = await User.findOne({ where: { username } });

        if (user && (await user.matchPassword(password))) {
            res.json({
                id: user.id,
                username: user.username,
                isAdmin: user.isAdmin,
                token: generateToken(user.id),
            });
        } else {
            res.status(401).json({ message: 'Tên đăng nhập hoặc mật khẩu không đúng.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi máy chủ khi đăng nhập.' });
    }
});

module.exports = router;
