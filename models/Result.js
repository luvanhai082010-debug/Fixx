// models/Result.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Result = sequelize.define('Result', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    roundId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
    result: {
        type: DataTypes.STRING, // 'P', 'B', 'T'
        allowNull: false,
    },
    // Optional: Lưu trữ thông tin chi tiết ván bài nếu cần
    details: {
        type: DataTypes.TEXT, 
        allowNull: true,
    }
}, {
    timestamps: true,
});

module.exports = Result;
