const request = require("supertest");
const { describe, it, expect } = require("@jest/globals");
const app = require("../app");
const { signToken } = require("../helpers/jwt");
const { Customer } = require("../models");

describe("Register - POST/pub/register", () => {
  afterAll(async () => {
    await Customer.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  });

  it("should respond 201 register success - create new customer ", async () => {
    const response = await request(app)
      .post("/pub/register")
      .send({ email: "testuser@gmail.com", password: "123456" });

    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty("message", "Register success");
    expect(response.body.customer).toHaveProperty(
      "email",
      "testuser@gmail.com"
    );
  });

  it("should respond 400 register failed - return error message 'Email can't be null'", async () => {
    const response = await request(app)
      .post("/pub/register")
      .send({ password: "123456" });

    expect(response.status).toEqual(400);
    expect(response.body.message).toHaveProperty(
      "email",
      "Email can't be null"
    );
  });

  it("should respond 400 register failed - return error message 'Password can't be null'", async () => {
    const response = await request(app)
      .post("/pub/register")
      .send({ email: "testuser@gmail.com" });

    expect(response.status).toEqual(400);
    expect(response.body.message).toHaveProperty(
      "password",
      "Password can't be null"
    );
  });

  it("should respond 400 register failed - return error message 'Email can't be empty'", async () => {
    const response = await request(app)
      .post("/pub/register")
      .send({ email: "", password: "123456" });

    expect(response.status).toEqual(400);
    expect(response.body.message).toHaveProperty(
      "email",
      "Email can't be empty"
    );
  });

  it("should respond 400 register failed - return error message 'Password can't be empty'", async () => {
    const response = await request(app)
      .post("/pub/register")
      .send({ email: "testuser@gmail.com", password: "" });

    expect(response.status).toEqual(400);
    expect(response.body.message).toHaveProperty(
      "password",
      "Password can't be empty"
    );
  });

  it("should respond 400 register failed - return error message 'Email should be unique'", async () => {
    const response = await request(app)
      .post("/pub/register")
      .send({ email: "testuser@gmail.com", password: "123456" });

    expect(response.status).toEqual(400);
    expect(response.body.message).toHaveProperty(
      "email",
      "Email should be unique"
    );
  });

  it("should respond 400 register failed - return error message 'Email format is incorrect'", async () => {
    const response = await request(app)
      .post("/pub/register")
      .send({ email: "test", password: "123456" });

    expect(response.status).toEqual(400);
    expect(response.body.message).toHaveProperty(
      "email",
      "Email format is incorrect"
    );
  });
});

describe("Login - POST/pub/login", () => {
  let customer;
  beforeAll(async () => {
    customer = await Customer.create({
      email: "testuser@gmail.com",
      password: "123456",
    });
  });

  afterAll(async () => {
    await Customer.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  });

  it("should respond 200 login success - return access_token", async () => {
    const response = await request(app)
      .post("/pub/login")
      .send({ email: "testuser@gmail.com", password: "123456" });

    const token = signToken({
      id: customer.id,
    });

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("access_token", token);
    expect(response.body).toHaveProperty("email", "testuser@gmail.com");
  });

  it("should respond 401 login failed - invalid password", async () => {
    const response = await request(app)
      .post("/pub/login")
      .send({ email: "testuser@gmail.com", password: "aaaaa" });

    expect(response.status).toEqual(401);
    expect(response.body).toHaveProperty(
      "message",
      "Invalid email or password"
    );
  });

  it("should respond 401 login failed - email not found in database", async () => {
    const response = await request(app)
      .post("/pub/login")
      .send({ email: "testuser@mail.com", password: "123456" });

    expect(response.status).toEqual(401);
    expect(response.body).toHaveProperty(
      "message",
      "Invalid email or password"
    );
  });
});
