const helper = require("./test_helper");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

beforeEach(helper.resetUserDb);

describe("login api - POST", () => {
    test("returns a token with valid credentials", async () => {
        const user = helper.initialUsers[0];

        const loginResult = await api
            .post("/api/login")
            .send({
                username: user.username,
                password: user.password
            })
            .expect(200)
            .expect("Content-Type", /application\/json/);

        expect(loginResult.body).toEqual({
            username: user.username,
            name: user.name,
            token: expect.any(String)
        });
    });

    test("fails with invalid credentials", async () => {
        await api.post("/api/login")
            .send({
                username: "error",
                password: "NotMyPassword"
            })
            .expect(401)
            .expect("Content-Type", /application\/json/);
    });

    test("fails with missing credentials", async () => {
        await api.post("/api/login")
            .expect(401)
            .expect("Content-Type", /application\/json/);
    });
});

