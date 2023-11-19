const request = require("supertest");
const { describe, it, expect } = require("@jest/globals");
const app = require("../app");
const { User, Product, Category } = require("../models");

const users = require("./data/users.json");
const products = require("./data/products.json");
const categories = require("./data/categories.json");

describe("Product - GET/pub/products", () => {
  beforeAll(async () => {
    await User.bulkCreate(users);
    await Category.bulkCreate(categories);
    await Product.bulkCreate(products);
  });

  afterAll(async () => {
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

  it("should respond 200 - get product success (no token and no query filter)", async () => {
    const response = await request(app).get("/pub/products");
    expect(response.status).toEqual(200);
    expect(response.body.products.length).toBe(20);
    expect(response.body.products[0]).toHaveProperty(
      "name",
      "Kaos Rick & Morty"
    );
  });

  it("should respond 200 - get product success (no token and 1 query filter)", async () => {
    const response = await request(app).get("/pub/products?name=Kaos");
    expect(response.status).toEqual(200);
    expect(response.body.products.length).toBe(1);
    expect(response.body.products[0]).toHaveProperty(
      "name",
      "Kaos Rick & Morty"
    );
  });

  it("should respond 200 - get product success (no token and using pagination)", async () => {
    const response = await request(app).get("/pub/products?page=2");
    const itemPerPage = 8;
    expect(response.status).toEqual(200);
    expect(response.body.products.length).toBe(itemPerPage);
    expect(response.body.products[0]).toHaveProperty("name", "Leather Jacket");
  });

  it("should respond 200 - get product by id success (no token)", async () => {
    const response = await request(app).get("/pub/products/1");
    expect(response.status).toEqual(200);
    expect(response.body.product).toHaveProperty("name", "Kaos Rick & Morty");
    expect(response.body.product).toHaveProperty("price", 10000);
  });

  it("should respond 404 - product not found (params id invalid)", async () => {
    const response = await request(app).get("/pub/products/70");
    expect(response.status).toEqual(404);
    expect(response.body).toHaveProperty("message", "Product not found");
  });
});
