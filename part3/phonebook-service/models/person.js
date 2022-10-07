const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

mongoose.connect(url)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(err => {
        console.log("Error connecting to MongoDB:", err.message);
    });

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        minLength: 12,
        required: true,
        validate: {
            validator: (v) => /\d{3}-\d{3}-\d{4}.*/.test(v)
        }
    }
});

personSchema.set("toJSON", {
    transform: (_input, output) => {
        output.id = output._id.toString();
        delete output._id;
        delete output.__v;
    }
});

const Person = mongoose.model("Person", personSchema);

module.exports = Person;
