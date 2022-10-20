const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogRouter.get("/", async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate("user", { username: 1, name: 1 });
    response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
    const { title, author, url, likes } = request.body;

    if (!request.token || !request.token.id) {
        return response.status(401).json({ error: "token missing or invalid" });
    }

    const user = await User.findById(request.token.id);

    const blog = new Blog({
        title,
        author,
        url,
        likes,
        user: user._id
    });
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog);
});

blogRouter.delete("/:id", async (request, response) => {
    if (!request.token || !request.token.id) {
        return response.status(401).json({ error: "token missing or invalid" });
    }

    const blog = await Blog.findById(request.params.id);
    if (blog) {
        if (blog.user && blog.user.toString() !== request.token.id) {
            return response.status(401).json({ error: "blog can only be deleted by the owner" });
        }

        await blog.delete();
    }

    response.status(204).end();
});

blogRouter.put("/:id", async (request, response) => {
    const body = request.body;

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    };

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true, context: "query" }).populate("user", { username: 1, name: 1 });
    response.json(updatedBlog);
});

module.exports = blogRouter;
