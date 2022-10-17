const helper = require("./test_helper");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

beforeEach(helper.resetUserDb);

describe("user api - GET", () => {
    test("returns as json", async () => {
        await api
            .get("/api/users")
            .expect(200)
            .expect("Content-Type", /application\/json/);
    });

    test("returns the test users", async () => {
        const response = await api.get("/api/users");
        expect(response.body).toHaveLength(helper.initialUsers.length);
        expect(response.body.map(u => u.username)).toEqual(expect.arrayContaining(helper.initialUsers.map(u => u.username)));
    });

    test("returns an id attribute", async () => {
        const response = await api.get("/api/users");
        expect(response.body[0].id).toBeDefined();
    });

    test("does not return a password or hash", async () => {
        const response = await api.get("/api/users");
        expect(response.body[0].password).toBeUndefined();
        expect(response.body[0].passwordHash).toBeUndefined();
    });
});

describe("user api - POST", () => {
    test("succeeds with valid data and returns the added entry", async () => {
        const testUser = {
            name: "Joe Biden",
            username: "prez",
            password: "what?"
        };

        const postResult = await api
            .post("/api/users")
            .send(testUser)
            .expect(201)
            .expect("Content-Type", /application\/json/);

        expect(postResult.body).toEqual({
            name: "Joe Biden",
            username: "prez",
            id: expect.any(String),
            blogs: []
        });

        const getResult = await api.get("/api/users");
        expect(getResult.body).toHaveLength(helper.initialUsers.length + 1);
        expect(getResult.body).toContainEqual(postResult.body);
    });


    test("fails and returns status code 400 when username isn't provided", async () => {
        const testUser = {
            name: "Anon Ymous",
            password: "1337"
        };

        await api
            .post("/api/users")
            .send(testUser)
            .expect(400)
            .expect("Content-Type", /application\/json/);

        const usersAtEnd = await api.get("/api/users");
        expect(usersAtEnd.body).toHaveLength(helper.initialUsers.length);
    });

    test("fails and returns status code 400 when password isn't provided", async () => {
        const testUser = {
            name: "Anon Ymous",
            username: "anon"
        };

        await api
            .post("/api/users")
            .send(testUser)
            .expect(400)
            .expect("Content-Type", /application\/json/);

        const usersAtEnd = await api.get("/api/users");
        expect(usersAtEnd.body).toHaveLength(helper.initialUsers.length);
    });

    test("fails and returns status code 400 when username is not unique", async () => {
        const testUser = {
            name: "Sleepy Joe",
            username: helper.initialUsers[0].username,
            password: "didn't I already register"
        };

        await api
            .post("/api/users")
            .send(testUser)
            .expect(400)
            .expect("Content-Type", /application\/json/);

        const usersAtEnd = await api.get("/api/users");
        expect(usersAtEnd.body).toHaveLength(helper.initialUsers.length);
    });
});
