const { stack } = require("../routes/auth");
const logger = require("../utils/logger");

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";

    logger.error(message, { statusCode, stack: err.stack });
    res.json({ message }).status(statusCode);
};

module.exports = errorHandler;
