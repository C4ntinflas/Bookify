'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CheckedOutBook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Users, Book}) {
      // define association here
      CheckedOutBook.belongsTo(Users, {
         foreignKey: 'user_id'});

      CheckedOutBook.belongsTo(Book, {
         foreignKey: 'book_id'});
    }
  }
  CheckedOutBook.init({
    checked_book_id:{ 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
  },
    user_id:{ 
      type: DataTypes.INTEGER,
      allowNull: false
  },
    book_id: { 
      type: DataTypes.INTEGER,
      allowNull: false
  },
    quantity:{ 
      type: DataTypes.INTEGER,
      allowNull: false
  },
 }, 
 {
    sequelize,
    modelName: 'CheckedOutBook',
    tableName: 'checked_out_books',
    timestamps: false
  });
  return CheckedOutBook;
};
