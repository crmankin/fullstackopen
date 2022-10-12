const mongoose = require("mongoose");
const helper = require("./test_helper");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

describe("blog api", () => {
    beforeEach(helper.resetBlogDb);

    test("GET returns as json", async () => {
        await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/);
    });

    test("GET returns all blogs", async () => {
        const response = await api.get("/api/blogs");
        expect(response.body).toHaveLength(helper.initialBlogs.length);
    });

    test("GET returns correct number of blogs by a specific author", async () => {
        const response = await api.get("/api/blogs");
        const expected = helper.initialBlogs.filter(b => b.author === "Edsger W. Dijkstra").length;
        const djikstraBlogs = response.body.filter(b => b.author === "Edsger W. Dijkstra");
        expect(djikstraBlogs).toHaveLength(expected);
    });

    test("GET returns an id attribute for blogs", async () => {
        const response = await api.get("/api/blogs");
        expect(response.body[0].id).toBeDefined();
    });

    test("POST adds a single blog and returns it", async () => {
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

    test("POST uses a default value of 0 for likes", async () => {
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

    test("POST returns 400 when title isn't provided", async () => {
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

    test("POST returns 400 when url isn't provided", async () => {
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

    afterAll(() => {
        mongoose.connection.close();
    });

});
