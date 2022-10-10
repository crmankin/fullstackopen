const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        minLength: 3,
        required: true
    },
    author: {
        type: String,
        required: false
    },
    url: {
        type: String,
        minLength: 12,
        required: true
    },
    likes: {
        type: Number,
        required: true
    }
});

blogSchema.set("toJSON", {
    transform: (_input, output) => {
        output.id = output._id.toString();
        delete output._id;
        delete output.__v;
    }
});


const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
