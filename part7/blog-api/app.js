const config = require("./utils/config");
const logger = require("./utils/logger");

const express = require("express");
require("express-async-errors");
const cors = require("cors");
const mongoose = require("mongoose");

const blogsRouter = require("./controllers/blog");
const usersRouter = require("./controllers/user");
const loginRouter = require("./controllers/login");
const middleware = require("./utils/middleware");


const app = express();

logger.info(`Connecting to ${config.MONGODB_URI}`);
mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info("Connected to MongoDB");
    })
    .catch((error) => {
        logger.error("Error connecting to MongoDB:", error.message);
    });

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/blogs", middleware.tokenReader, blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
if(config.NODE_ENV === "test") {
    const testingRouter = require("./controllers/testing");
    app.use("/api/testing", testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
