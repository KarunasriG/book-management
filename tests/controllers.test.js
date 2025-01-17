const request = require("supertest");
const app = require("../index.js");
const { User, Book, ReadingList, sequelize } = require("../models");
const {
  addUser,
  addBook,
  addToReadingList,
} = require("../controllers/addData");

jest.mock("../models", () => ({
  sequelize: {
    authenticate: jest.fn(() => Promise.resolve()),
  },
  User: {
    create: jest.fn(),
  },
}));

describe("Controllers Tests", () => {
  describe("User Controller ", () => {
    it("should create a new user", async () => {
      const mockUser = {
        id: 1,
        username: "testuser",
        email: "test@example.com",
      };
      User.create.mockResolvedValue(mockUser);

      const req = { body: { username: "testuser", email: "test@example.com" } };
      const res = { json: jest.fn(), status: jest.fn(() => res) };

      await addUser(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "User created successfully",
        user: mockUser,
      });
    });

    it("should return 400 if username or email is missing", async () => {
      const mockRequestBody = {
        username: "testuser",
      };

      const response = await request(app)
        .post("/api/users")
        .send(mockRequestBody);

      expect(response.status).toBe(400);
    });
  });
});
