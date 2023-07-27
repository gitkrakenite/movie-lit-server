const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const colors = require("colors");
const connectDB = require("./config/db");
const userRouter = require("./routes/userRouter");
const moviesRouter = require("./routes/moviesRouter");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB(); //DB connection

app.get("/", (req, res) => res.status(200).send("API WORKING WELL"));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/scene", moviesRouter);

app.listen(PORT, () => console.log(`server running on port ${PORT}`.red));
