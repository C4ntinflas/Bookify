'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StoresBook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ BookStore, Book}) {
      // define association here
      StoresBook.belongsTo(BookStore, { 
        foreignKey: 'store_id' 
      });

      StoresBook.belongsTo(Book, {
        foreignKey: 'book_id'
      });

      BookStore.hasMany(StoresBook, {
        foreignKey: 'store_id'
      });

      Book.hasMany(StoresBook, {
        foreignKey: 'book_id'
      });
    }
  }
  StoresBook.init({
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    store_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'BookStore',
        key: 'store_id'
      },
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Bookstore',
        key: 'store_id'
      }
    }
  }, {
    sequelize,
    modelName: 'StoresBook',
    tableName: 'stores_book',
    timestamps: false,
  });
  return StoresBook;
};