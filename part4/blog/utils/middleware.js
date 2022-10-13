const logger = require("./logger");
const morgan = require("morgan");

morgan.token("body", (req) => {
    return (req.method === "POST" || req.method === "PUT")
        ? JSON.stringify(req.body, (k, v) => {
            if (k === "password") return "####";
            return v;
        })
        : "-";
});

const requestLogger = morgan(":method :url :status :res[content-length] - :response-time ms :body");

const unknownEndpoint = (request, response) => {
    response.status(404).json({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
    logger.error(error.message);

    if (error.name === "CastError") {
        return response.status(400).json({ error: "Malformed ID" });
    } else if (error.name === "ValidationError") {
        return response.status(400).json({ error: error.message });
    }

    next(error);
};

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
};
