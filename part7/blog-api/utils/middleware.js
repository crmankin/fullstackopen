const logger = require("./logger");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const config = require("./config");

morgan.token("body", (req) => {
    return (req.method === "POST" || req.method === "PUT")
        ? JSON.stringify(req.body, (k, v) => {
            if (k === "password") return "####";
            return v;
        })
        : "-";
});

const requestLogger = morgan(":method :url :status :res[content-length] - :response-time ms :body");

const tokenReader = (request, response, next) => {
    const authorization = request.get("authorization");
    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
        const decodedToken = jwt.verify(authorization.substring(7), config.JWT_SECRET);
        if (decodedToken) request.token = decodedToken;
    }

    next();
};

const unknownEndpoint = (request, response) => {
    response.status(404).json({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
    logger.error(error.message);

    if (error.name === "CastError") {
        return response.status(400).json({ error: "Malformed ID" });
    } else if (error.name === "ValidationError") {
        return response.status(400).json({ error: error.message });
    } else if (error.name === "JsonWebTokenError") {
        return response.status(401).json({ error: "invalid token" });
    }

    next(error);
};

module.exports = {
    requestLogger,
    tokenReader,
    unknownEndpoint,
    errorHandler
};
