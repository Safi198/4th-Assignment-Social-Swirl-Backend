const { createLogger, transports, format } = require("winston");

const logger = createLogger({
    level: "info",
    format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, msg, meta }) => {
            return `${timestamp} [${level}]: ${msg} ${
                meta ? JSON.stringify(meta) : ""
            }`;
        })
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: `logs/app.log` }),
    ],
});

module.exports = logger;
