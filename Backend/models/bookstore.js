"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BookStore extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Book, StoresBook }) {
      // define association here
      BookStore.hasMany(Book, {
        foreignKey: 'store_id'
      });

      BookStore.belongsToMany(Book, {
        through: StoresBook,
        foreignKey: 'store_id'
      });
    }
  }
  BookStore.init(
    {
      store_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      store_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      admin_user: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "BookStore",
      tableName: "book_stores",
      timestamps: false,
    }
  );
  return BookStore;
};
