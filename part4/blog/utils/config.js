require("dotenv").config();

const NODE_ENV = process.env.NODE_ENV;

const JWT_SECRET = process.env.JWT_SECRET;
const MONGODB_URI = NODE_ENV === "test" ? process.env.MONGODB_URI_TEST : process.env.MONGODB_URI;
const PORT = process.env.PORT || 3001;

module.exports = {
    JWT_SECRET,
    MONGODB_URI,
    NODE_ENV,
    PORT
};
