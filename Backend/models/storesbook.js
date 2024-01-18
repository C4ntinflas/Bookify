"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StoresBook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ BookStore, Book }) {
      StoresBook.belongsTo(BookStore, {
        foreignKey: "store_id",
      });

      StoresBook.belongsTo(Book, {
        foreignKey: "book_id",
      });
    }
  }
  StoresBook.init(
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      store_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "BookStore",
          key: "store_id",
        },
      },
      book_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Book", // Corrected reference to the Book model
          key: "book_id",
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "StoresBook",
      tableName: "stores_books",
      timestamps: false,
    }
  );
  return StoresBook;
};
