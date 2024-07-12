const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
console.log(process.env.MONGO_URI);


const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const authticateJWT = require("./middleware/authenticate");
const user = require("./models/user");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/admin",adminRoutes)
app.get("/",(req,res)=>{
    res.send("Server is running")
});


mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB", err);
    });