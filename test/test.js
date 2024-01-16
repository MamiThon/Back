const { Sequelize } = require("sequelize");
const request = require("supertest");
require('dotenv').config();

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
});

const baseURL = "http://localhost:3030";

const UsersModels = require("../Models/Users");

const Users = new UsersModels(sequelize, Sequelize);

let req;

beforeAll(async () => {
    await sequelize.sync({ force: true });
});

beforeEach(async () => {
    req = request(baseURL);
});

describe("Users controller", () => {
    describe("usersUser", () => {
        it("should create a new User", async () => {
            const userData = {
                username: "testers",
                email: "tester@test.test",
                password: "testpass",
            };
            const response = await req.post("/api/users/").send(userData);
            expect(response.status).toBe(201);
        });

        it("should return 400 if request body is invalid", async () => {
            const Users = {
                username: "testers",
                email: "tester@test.test",
            };
            const response = await req.post("/api/users/").send(Users);
            expect(response.status).toBe(400);
            expect(response.body.error).toBeDefined();
        });

    });
});