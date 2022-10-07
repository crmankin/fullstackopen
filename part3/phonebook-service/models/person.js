const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

mongoose.connect(url)
    .then(result => {
        console.log("Connected to MongoDB");
    })
    .catch(err => {
        console.log("Error connecting to MongoDB:", err.message);
    });

const personSchema = new mongoose.Schema({
    name: String,
    number: String
});

personSchema.set("toJSON", {
    transform: (input, output) => {
        output.id = output._id.toString();
        delete output._id;
        delete output.__v;
    }
});

const Person = mongoose.model("Person", personSchema);

module.exports = Person;
