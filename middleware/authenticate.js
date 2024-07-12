const jwToken = require("jsonwebtoken");
require("dotenv").config();

const authenticationJWT = (req, res, next) => {
    const authHeader = (req.headers.authorization);

    if (!authHeader) {
        return res
            .json({ failureMessage: "Access Denied. No token provided" })
            .status(401);
    }

    const token = authHeader;

    jwToken.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            return res.json({ failureMessage: "Invalid token!" }).status(401);
        }

        req.user = user;
        next();
    });
};

module.exports = authenticationJWT;
