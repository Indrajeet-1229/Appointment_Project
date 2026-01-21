const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    const { name, email, password, cpassword } = req.body;

    if (!name || !email || !password || !cpassword) {
        return res.status(400).json({
            message: "All fields are required",
            success: false
        })
    }

    if (password !== cpassword) {
        return res.status(400).json({ message: "Password dosen't match", success: false });
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).json({ message: "Invalid email", success: false });
    }

    try {
        const existUser = await User.exists({ email });
        if (existUser) {
            return res.status(400).json({ message: "User already exists, Please login", success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,

        });

        const newUserData = newUser.toObject();
        delete newUserData.password;

        const token = jwt.sign({
            id: newUser._id, email: newUser.email
        }, process.env.JWT_SECRET, {
            expiresIn: "24h"
        })

        return res
            .status(201)
            .json({ success: true, message: "User registered successfully", user:newUserData, token });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message || "Server error. Please try again later", });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "All fields are required",
            success: false
        })
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid email and password",
                success: false
            })
        }

        const token = jwt.sign({
            id: user._id,
            email: user.email
        }, process.env.JWT_SECRET, { expiresIn: "24h" })


        const newUserData = user.toObject();
        delete newUserData.password;

        return res
            .status(200)
            .json({ success: true, message: "login successfully", token, user: newUserData });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message || "Server error. Please try again later", });
    }
};

module.exports = { registerUser, login }