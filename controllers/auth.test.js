import request from "supertest";
import mongoose from "mongoose";
import app from "../app.js";
import User from "../models/User.js";
import "jest";
const { TEST_DB_HOST, PORT = 3000 } = process.env;

describe("test auth controller", () => {
  let server = null;

  beforeAll(async () => {
    await mongoose.connect(TEST_DB_HOST);
    server = app.listen(PORT);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  afterEach(async () => {
    User.deleteMany({});
  });

  test("test request must have status code 201", async () => {
    const requestData = {
      email: "zakhar@mail.com",
      password: "123",
    };
    const { statusCode, body } = await request(app)
      .post("/api/users/login")
      .send(requestData);

    expect(Object.keys(body.user).length).toBe(2);

    expect(body.user.email).toBe(requestData.email);

    expect(typeof body.token).toBe("string");
    expect(body.token.split(".").length).toBe(3);

    expect(typeof body.user.subscription).toBe("string");
    expect(typeof body.user.email).toBe("string");

    expect(statusCode).toBe(200);

    const user = await User.findOne({ email: requestData.email });

    expect(user.email).toBe(requestData.email);
  });
});
