"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("checked_out_books", {
      checked_book_id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "users", // Name of the referenced table
          key: "user_id", // Primary key of the referenced table
        },
        allowNull: false,
      },
      book_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "books", // Name of the referenced table
          key: "book_id", // Primary key of the referenced table
        },
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("checked_out_books");
  },
};
