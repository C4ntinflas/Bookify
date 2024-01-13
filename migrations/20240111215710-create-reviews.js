'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reviews', {
      rating_id: { 
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      book_id:
      { 
        type: Sequelize.INTEGER,
        allowNull:false,
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      user_comment: {
        type: Sequelize.TEXT,
        allowNull: false
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('reviews');
  }
};