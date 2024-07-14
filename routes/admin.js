const express = require("express");
const router = express.Router();
const {
    authenticationJWT,
    checkRole,
} = require("../middleware/roleMiddleware");
const User = require("../models/user");

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Retrieve a list of all users (Admin Only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Admin Access
 *                 token:
 *                   type: string
 *                   example: Bearer <your_jwt_token>
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       username:
 *                         type: string
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */
router.get(
    "/users",
    authenticationJWT,
    checkRole(["admin"]),
    async (req, res) => {
        try {
            const users = await User.find({}, "username");
            res.status(200).json({
                message: "Admin Access",
                token: req.headers.authorization,
                users,
            });
        } catch (err) {
            res.status(500).json({
                message: "Internal server error",
                err: err.message,
            });
        }
    }
);

module.exports = router;
