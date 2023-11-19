const request = require("supertest");
const { describe, it, expect } = require("@jest/globals");
const app = require("../app");
const { User, Product, Category, Customer, Bookmark } = require("../models");
const { signToken } = require("../helpers/jwt");

const users = require("./data/users.json");
const products = require("./data/products.json");
const categories = require("./data/categories.json");
const customers = require("./data/customers.json");
const bookmarks = require("./data/bookmarks.json");

describe("Bookmark - /pub/bookmarks", () => {
  let testCustomer;
  beforeAll(async () => {
    await User.bulkCreate(users);
    await Category.bulkCreate(categories);
    await Product.bulkCreate(products);
    await Customer.bulkCreate(customers);
    await Bookmark.bulkCreate(bookmarks);

    const customer = await Customer.findAll();
    testCustomer = customer[0];
  });

  afterAll(async () => {
    await Bookmark.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
    await Customer.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
    await Product.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
    await Category.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
    await User.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  });

  it("should respond 200 - get bookmarks success", async () => {
    const token = signToken({ id: testCustomer.id });

    const response = await request(app)
      .get("/pub/bookmarks")
      .set("access_token", token);

    expect(response.status).toEqual(200);
    expect(response.body.bookmarks[0]).toHaveProperty("CustomerId", 1);
    expect(response.body.bookmarks[0]).toHaveProperty("ProductId", 1);
  });

  it("should respond 201 - add bookmarks success", async () => {
    const token = signToken({ id: testCustomer.id });

    const response = await request(app)
      .post("/pub/bookmarks/3")
      .set("access_token", token);

    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty(
      "message",
      "Jacket Hoodie added to bookmark"
    );
    expect(response.body.newBookmark).toHaveProperty("ProductId", 3);
  });

  it("should respond 404 - add bookmarks failed (product id not found in database)", async () => {
    const token = signToken({ id: testCustomer.id });

    const response = await request(app)
      .post("/pub/bookmarks/100")
      .set("access_token", token);

    expect(response.status).toEqual(404);
    expect(response.body).toHaveProperty("message", "Product not found");
  });

  it("should respond 401 - get bookmarks failed (user is not logged in)", async () => {
    const response = await request(app)
      .get("/pub/bookmarks")
      .set("access_token", "");

    expect(response.status).toEqual(401);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });

  it("should respond 401 - get bookmarks failed (invalid token)", async () => {
    const response = await request(app)
      .get("/pub/bookmarks")
      .set("access_token", "invalidtoken");

    expect(response.status).toEqual(401);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });
});
