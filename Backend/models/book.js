'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ BookStore, Reviews, StoresBook, UserInventory}) {
      // define association here
      Book.belongsTo(BookStore, {
        foreignKey: 'store_id'
      });

      Book.hasMany(Reviews, {
        foreignKey: 'book_id'
      });

      Book.hasMany(StoresBook, {
        foreignKey: 'book_id'
      });
    
      Book.hasMany(UserInventory, {
        foreignKey: 'book_id'
      });
    }
  }
  Book.init({
    book_id:{ 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    genre: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    total_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    store_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'BookStore',
        key: 'store_id'
      },
    },
 },
  {
    sequelize,
    modelName: 'Book',
    tableName: 'books',
    timestamps: false
  })
  return Book;
};

