const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const { swaggerUi, swaggerSpec } = require("./swaggerConfig");
const logger = require("./utils/logger");
const errorHandler = require("./middleware/errorHandler");

const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
    logger.info(`Incomming request: ${req.method} ${req.url}`);
    next();
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use(errorHandler);

app.get("/", (req, res) => {
    res.send("Server is running");
});

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        logger.info("Connected to MongoDB");
        app.listen(port, () => {
            logger.info(`Server running on port ${port}`);
        });
    })
    .catch((err) => {
        logger.error("Failed to connect to MongoDB", err);
    });
