const bCrypt = require("bcryptjs");
const jwtoken = require("jsonwebtoken");
require("dotenv").config();

const user = require("../models/user");

exports.register = async (req, res) => {
    try {
        const { username, password, role } = req.body;

        if (!username || !password) {
            return res
                .status(400)
                .json({ failureMessage: "Username and Password both are required!" });
        }

        const existingUser = await user.findOne({ username });

        if (existingUser) {
            return res
                .status(400)
                .json({ success: "Username already register" });
        }

        const hashPassword = await bCrypt.hash(password, 10);

        const validRoles = ['admin', 'user'];
        const userRole = validRoles.includes(role) ? role : 'user';

        const newUser = new user({ username, password: hashPassword, role: userRole });
        await newUser.save();

        res.status(200).json({ success: "User registered successfully", newUser });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", err: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res
                .status(400)
                .json({ failureMessage: "Username and password are required" });
        }

        const uUser = await user.findOne({ username });

        if (!uUser) {
            return res
                .status(400)
                .json({ failureMessage: "Invalid credentials" });
        }

        const isPasswordValid = await bCrypt.compare(password, uUser.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwtoken.sign(
            { username: uUser.username, role: uUser.role },
            process.env.SECRET_KEY
        );

        res.status(200).json({ success: "Login Successfully", token: token });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            err: err.message,
        });
    }
};
