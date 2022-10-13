const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: 3,
        required: true
    },
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    }
});

userSchema.set("toJSON", {
    transform: (_input, output) => {
        output.id = output._id.toString();
        delete output._id;
        delete output.__v;
        delete output.passwordHash;
    }
});


const User = mongoose.model("User", userSchema);

module.exports = User;
