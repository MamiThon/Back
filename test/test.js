const SequelizeMock = require("sequelize-mock");
const User = require('../Models/Users');
const { createUser } = require("../controllers/usersController.js");
const httpMocks = require('node-mocks-http');

describe("User controller", () => {
  let sequelizeMock;
  let Users;

  beforeAll(() => {
    sequelizeMock = new SequelizeMock();
    Users = sequelizeMock.define("User", {
        username: "testers",
        email: "tester@test.test",
        password: "testpass",
    });
  });

  describe("createUser", () => {
    it("should create a new user", async () => {
        const user = {
            username: "newtesters",
            email: "nestester@test.test",
            password: "testpass",
          };
        
          // Use the correct model name 'User' instead of 'Users'
          Users.$queueResult(User.build(user));

          const res = httpMocks.createResponse();
        
          const response = await createUser({ body: user }, res);
          console.log(response);
          expect(response.statusCode).toBe(201);
    });

    it("should return 400 if request body is invalid", async () => {
      const users = {
        username: "newtesters",
        email: "nestester@test.test",
    };
    
    const res = httpMocks.createResponse();

      const response = await createUser({ body: users }, res);

      expect(response.statusCode).toBe(400);
    });
  });

//   describe("getAllMovies", () => {
//     it("should return all movies", async () => {
//       const users = [
//         { title: "The Matrix", releaseDate: "1999-03-31", duration: 136 },
//         { title: "Inception", releaseDate: "2010-07-16", duration: 148 },
//       ];
//       Users.$queueResult(users.map((user) => Users.build(user)));
//       const response = await getAllMovies();
//       expect(response.status).toBe(200);
//       expect(response.body.length).toBe(users.length);
//       expect(response.body[0].title).toBe(users[0].title);
//       expect(response.body[1].title).toBe(users[1].title);
//     });
//   });
});