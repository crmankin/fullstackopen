const mongoose = require("mongoose");
const helper = require("./test_helper");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");

const api = supertest(app);

beforeEach(helper.resetBlogDb);

describe("blog api - GET", () => {
    test("returns as json", async () => {
        await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/);
    });

    test("returns all blogs", async () => {
        const response = await api.get("/api/blogs");
        expect(response.body).toHaveLength(helper.initialBlogs.length);
    });

    test("returns correct number of blogs by a specific author", async () => {
        const response = await api.get("/api/blogs");
        const expected = helper.initialBlogs.filter(b => b.author === "Edsger W. Dijkstra").length;
        const djikstraBlogs = response.body.filter(b => b.author === "Edsger W. Dijkstra");
        expect(djikstraBlogs).toHaveLength(expected);
    });

    test("returns an id attribute for blogs", async () => {
        const response = await api.get("/api/blogs");
        expect(response.body[0].id).toBeDefined();
    });
});

describe("blog api - POST", () => {
    test("succeeds with valid data returns the added entry", async () => {
        const testBlog = {
            title: "Results of Bad Testing",
            author: "Christopher R. Mankin",
            url: "https://property.franklincountyauditor.com",
            likes: 150
        };

        const postResult = await api
            .post("/api/blogs")
            .send(testBlog)
            .expect(201)
            .expect("Content-Type", /application\/json/);

        expect(postResult.body).toEqual({
            ...testBlog,
            id: expect.any(String)
        });

        const getResult = await api.get("/api/blogs");
        expect(getResult.body).toHaveLength(helper.initialBlogs.length + 1);
        expect(getResult.body).toContainEqual(postResult.body);
    });

    test("uses a default value of 0 for likes", async () => {
        const testBlog = {
            title: "Results of Bad Testing",
            author: "Christopher R. Mankin",
            url: "https://property.franklincountyauditor.com"
        };

        const postResult = await api
            .post("/api/blogs")
            .send(testBlog)
            .expect(201)
            .expect("Content-Type", /application\/json/);
        expect(postResult.body.likes).toEqual(0);

        const getResult = await api.get("/api/blogs");
        const getBlog = getResult.body.filter(b => b.id === postResult.body.id)[0];
        expect(getBlog.likes).toEqual(0);
    });

    test("returns status code 400 when title isn't provided", async () => {
        const testBlog = {
            author: "Christopher R. Mankin",
            url: "https://property.franklincountyauditor.com"
        };

        await api
            .post("/api/blogs")
            .send(testBlog)
            .expect(400)
            .expect("Content-Type", /application\/json/);
    });

    test("returns status code 400 when url isn't provided", async () => {
        const testBlog = {
            title: "Results of Bad Testing",
            author: "Christopher R. Mankin"
        };

        await api
            .post("/api/blogs")
            .send(testBlog)
            .expect(400)
            .expect("Content-Type", /application\/json/);
    });
});

describe("blog api - DELETE", () => {
    test("succeeds with status code 204 if id is valid", async () => {
        const blogsAtStart = await Blog.find({});
        const blogToDelete = blogsAtStart[0];

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204);

        const blogsAtEnd = await Blog.find({});
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);
        expect(blogsAtEnd).not.toContainEqual(blogToDelete);
    });
});

afterAll(() => {
    mongoose.connection.close();
});
