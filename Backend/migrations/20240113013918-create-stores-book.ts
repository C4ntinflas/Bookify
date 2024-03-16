'use strict';
import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.createTable('stores_books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      store_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'book_stores', // Name of the referenced table
          key: 'store_id', // Primary key of the referenced table
        },
        allowNull: false,
      },
      book_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'books', // Name of the referenced table
          key: 'book_id', // Primary key of the referenced table
        },
        allowNull: false,
      },
    });
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('stores_books');
  },
};
