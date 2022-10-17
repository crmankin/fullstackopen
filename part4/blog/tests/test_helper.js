const bcrypt = require("bcrypt");
const Blog = require("../models/blog");
const User = require("../models/user");


const initialUsers = [
    {
        name: "Tester A",
        username: "testerA",
        password: "Test-PW1"
    },
    {
        name: "Tester B",
        username: "testerB",
        password: "PW2-test"
    }
];

const initialBlogs = [
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        username: "testerA"
    },
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        username: "testerA"
    },
    {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        username: "testerB"
    },
    {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        username: "testerB"
    }
];

const resetUserDb = async () => {
    await User.deleteMany({});

    return Promise.all(initialUsers.map(async u => {
        const passwordHash = await bcrypt.hash(u.password, 10);

        return new User({
            name: u.name,
            username: u.username,
            passwordHash
        }).save();
    }));
};

const resetBlogDb = async () => {
    await Blog.deleteMany({});
    const users = await User.find({});
    const userIdsByUsername = users.reduce((prev, next) => {
        prev[next.username] = next._id;
        return prev;
    }, {});

    return Promise.all(initialBlogs.map(b => {
        const blog = new Blog({
            title: b.title,
            author: b.author,
            url: b.url,
            likes: b.likes,
            user: userIdsByUsername[b.username]
        });
        return blog.save();
    }));
};

const usersInDb = async () => {
    const users = await User.find({});
    return users.map(u => u.toJSON());
};

const blogsInDb = async () => {
    const blogs = await Blog
        .find({})
        .populate("user", { username: 1, name: 1 });
    return blogs.map(b => b.toJSON());
};


module.exports = {
    initialUsers,
    initialBlogs,
    resetUserDb,
    resetBlogDb,
    usersInDb,
    blogsInDb
};

