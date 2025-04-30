const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const mongoose = require('mongoose');
const cors = require('cors');


const register = async function (req, res) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const existingUser = await User.findOne({ $or: [{ name }, { email }] });
        if (existingUser) {
            return res.status(409).json({ message: 'Username or email already in use.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password_hash: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully.' });
    } catch (err) {
        res.status(500).json({ message: 'Registration failed.', error: err.message });
    }
};

const login = async function (req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: 'Invalid email or password.' });

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) return res.status(401).json({ message: 'Invalid email or password.' });

        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '15m' }
        );

        const refreshToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: '1d' }
        );

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 15 * 60 * 1000, // 15 minutes
            sameSite: process.env.NODE_ENV === "production" ? 'Strict' : 'Lax',
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            sameSite: process.env.NODE_ENV === "production" ? 'Strict' : 'Lax',
        });

        res.status(200).json({ message: 'Login successful.' });

    } catch (err) {
        res.status(500).json({ message: 'Login failed.', error: err.message });
    }
};

const logout = (req, res) => {
    res.clearCookie('accessToken', {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? 'Strict' : 'Lax',
        secure: process.env.NODE_ENV === "production"
    });

    res.clearCookie('refreshToken', {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? 'Strict' : 'Lax',
        secure: process.env.NODE_ENV === "production"
    });

    res.status(200).json({ message: 'Logged out successfully.' });
};

const refreshAccessToken = async function (req, res) {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token is required.' });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '15m' }
        );

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 15 * 60 * 1000, // 15 minutes
            sameSite: process.env.NODE_ENV === "production" ? 'Strict' : 'Lax',
        });

        res.status(200).json({ message: 'Access token refreshed.' });

    } catch (err) {
        res.status(401).json({ message: 'Invalid or expired refresh token.' });
    }
};

module.exports = { register, login, logout, refreshAccessToken };
