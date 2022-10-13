const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");
const config = require("../utils/config");

loginRouter.post("/", async (request, response) => {
    const { username, password } = request.body;

    const user = await User.findOne({ username });
    const success = user && await bcrypt.compare(password, user.passwordHash);

    if(!success) return response.status(401).json({ error: "Invalid username or password" });

    const userForToken = {
        username,
        id: user._id
    };

    const token = jwt.sign(userForToken, config.JWT_SECRET);

    response.status(200).json({
        username,
        name: user.name,
        token
    });
});

module.exports = loginRouter;
