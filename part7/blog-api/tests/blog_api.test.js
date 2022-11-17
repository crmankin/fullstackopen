const mongoose = require("mongoose");
const helper = require("./test_helper");
const supertest = require("supertest");
const app = require("../app");

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
        expect(response.body.map(b => b.title)).toEqual(expect.arrayContaining(helper.initialBlogs.map(b => b.title)));
    });

    test("returns an id attribute for blogs", async () => {
        const response = await api.get("/api/blogs");
        expect(response.body[0].id).toBeDefined();
    });
});

describe("blog api - POST", () => {
    let creds;
    beforeEach(async () => {
        const user = helper.initialUsers[0];

        const loginResult = await api
            .post("/api/login")
            .send({
                username: user.username,
                password: user.password
            });

        creds = loginResult.body;
    });

    test("fails when no authorization provided", async () => {
        const testBlog = {
            title: "Unsuccessful Hacks",
            author: "Dr. Dim Witted",
            url: "https://www.amazon.com",
            likes: 3
        };

        await api
            .post("/api/blogs")
            .send(testBlog)
            .expect(401)
            .expect("Content-Type", /application\/json/);

        const blogs = await helper.blogsInDb();
        expect(blogs.length).toEqual(helper.initialBlogs.length);
    });

    test("succeeds with valid data and returns the added entry", async () => {
        const testBlog = {
            title: "Results of Bad Testing",
            author: "Christopher R. Mankin",
            url: "https://property.franklincountyauditor.com",
            likes: 150
        };

        const postResult = await api
            .post("/api/blogs")
            .set("Authorization", `bearer ${creds.token}`)
            .send(testBlog)
            .expect(201)
            .expect("Content-Type", /application\/json/);

        expect(postResult.body).toEqual({
            ...testBlog,
            id: expect.any(String),
            user: expect.any(String)
        });

        const getResult = await api.get("/api/blogs");
        expect(getResult.body).toHaveLength(helper.initialBlogs.length + 1);
        expect(getResult.body.map(b => b.id)).toContain(postResult.body.id);
    });

    test("uses a default value of 0 for likes", async () => {
        const testBlog = {
            title: "Results of Bad Testing",
            author: "Christopher R. Mankin",
            url: "https://property.franklincountyauditor.com"
        };

        const postResult = await api
            .post("/api/blogs")
            .set("Authorization", `bearer ${creds.token}`)
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
            .set("Authorization", `bearer ${creds.token}`)
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
            .set("Authorization", `bearer ${creds.token}`)
            .send(testBlog)
            .expect(400)
            .expect("Content-Type", /application\/json/);
    });
});

describe("blog api - DELETE", () => {
    let creds;
    beforeEach(async () => {
        const user = helper.initialUsers[0];

        const loginResult = await api
            .post("/api/login")
            .send({
                username: user.username,
                password: user.password
            });

        creds = loginResult.body;
    });

    test("succeeds with status code 204 if id is valid", async () => {
        const blogsAtStart = await helper.blogsInDb();
        const blogToDelete = blogsAtStart.filter(b => b.user.username === creds.username)[0];

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set("Authorization", `bearer ${creds.token}`)
            .expect(204);

        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);
        expect(blogsAtEnd.map(b => b.id)).not.toContain(blogToDelete.id);
    });

    test("fails with status code 401 if no authentication provided", async () => {
        const blogsAtStart = await helper.blogsInDb();
        const blogToDelete = blogsAtStart[0];

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(401);

        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
    });

    test("fails with status code 401 if authenticated as different user", async () => {
        const blogsAtStart = await helper.blogsInDb();
        const blogToDelete = blogsAtStart.filter(b => b.user.username !== creds.username)[0];

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set("Authorization", `bearer ${creds.token}`)
            .expect(401);

        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
    });
});

describe("blog api - PUT", () => {
    test("successfully updates likes and returns the added entry", async () => {
        const blogsAtStart = await helper.blogsInDb();
        const blogToUpdate = {
            id: blogsAtStart[0].id,
            likes: blogsAtStart[0].likes
        };
        const originalLikes = blogToUpdate.likes;
        blogToUpdate.likes += 10;

        const result = await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(blogToUpdate)
            .expect(200);

        const results = await api.get("/api/blogs");
        const updatedBlog = results.body.filter(b => b.id === blogToUpdate.id)[0];
        expect(updatedBlog.likes).toEqual(originalLikes + 10);
        expect(result.body).toEqual({
            ...updatedBlog,
            user: expect.anything()
        });
    });
});

afterAll(() => {
    mongoose.connection.close();
});
