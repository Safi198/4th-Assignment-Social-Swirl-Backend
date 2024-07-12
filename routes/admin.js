const express = require("express");
const route = express.Router();

const {
    authenticationJWT,
    checkRole,
} = require("../middleware/roleMiddleware");
const user = require("../models/user");



route.get(
    "/users",
    authenticationJWT,
    checkRole(["admin"]),
    async (req, res) => {
        try {
            const users = await user.find({}, "username");
            res.json({message:"Admin Access",token:req.headers.authorization,users});
        } catch (err) {
            res.status(500).json({
                message: "Internal server error",
                err: err.message,
            }); 
        }
    }
);

module.exports = route;