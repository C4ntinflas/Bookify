'use strict';

import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.createTable('book_stores', {
      store_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      store_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      admin_user: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      available_books: {
        type: Sequelize.STRING,
        allowNull: false
      },
    });
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('book_stores');
  }
};
