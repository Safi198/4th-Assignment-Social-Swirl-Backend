const bCrypt = require("bcryptjs");
const jwtoken = require("jsonwebtoken");
require("dotenv").config();

const user = require("../models/user");
const ValidationError = require("../errors/ValidationError");
const NotFoundError = require("../errors/NotFoundError");


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: The user's username
 *         password:
 *           type: string
 *           description: The user's password
 *         role:
 *           type: string
 *           description: The user's role
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Username and Password both are required
 *       500:
 *         description: Internal server error
 */
exports.register = async (req, res,next) => {
    try {
        const { username, password, role } = req.body;

        if (!username || !password) {
            throw new ValidationError("Username and Password both are required!");
        }

        const existingUser = await user.findOne({ username });

        if (existingUser) {
            throw new ValidationError("Username already registered");
        }

        const hashPassword = await bCrypt.hash(password, 10);

        const validRoles = ['admin', 'user'];
        const userRole = validRoles.includes(role) ? role : 'user';

        const newUser = new user({ username, password: hashPassword, role: userRole });
        await newUser.save();

        res.status(200).json({ success: "User registered successfully", newUser });
    } catch (err) {
        next(err);
    }
};




/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login Successfully
 *       400:
 *         description: Username and password are required or Invalid credentials
 *       500:
 *         description: Internal server error
 */
exports.login = async (req, res,next) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            throw new ValidationError("Username and password are required");
        }

        const uUser = await user.findOne({ username });

        if (!uUser) {
            throw new ValidationError("Invalid credentials");
        }

        const isPasswordValid = await bCrypt.compare(password, uUser.password);

        if (!isPasswordValid) {
            throw new ValidationError("Invalid credentials");
        }

        const token = jwtoken.sign(
            { username: uUser.username, role: uUser.role },
            process.env.SECRET_KEY
        );

        res.status(200).json({ success: "Login Successfully", token: token });
    } catch (err) {
        next(err);
    }
};
