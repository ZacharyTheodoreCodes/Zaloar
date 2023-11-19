"use strict";
const bcrypt = require("bcryptjs");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const customers = require("../data/customers.json").map((customer) => {
      customer.createdAt = customer.updatedAt = new Date();
      customer.password = bcrypt.hashSync(customer.password);
      return customer;
    });

    const bookmarks = require("../data/bookmarks.json").map((bookmark) => {
      bookmark.createdAt = bookmark.updatedAt = new Date();
      return bookmark;
    });

    await queryInterface.bulkInsert("Customers", customers);
    await queryInterface.bulkInsert("Bookmarks", bookmarks);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
