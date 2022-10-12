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

    afterAll(() => {
        mongoose.connection.close();
    });

});
