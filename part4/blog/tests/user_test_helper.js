const User = require("../models/user");
const bcrypt = require("bcrypt");

const resetUserDb = async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("ThePassword", 10);
    const user = new User({ name: "Administrator", username: "root", passwordHash });

    await user.save();
};

module.exports = {
    resetUserDb
};

