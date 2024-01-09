'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookStore extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BookStore.init({
    store_id:{ 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
  },
    store_name: {
     type: DataTypes.STRING,
     allowNull: false,  
 },
    address:{
      type: DataTypes.STRING,
      allowNull: false,  
  }, 
    available_books:{
      type: DataTypes.STRING,
      allowNull: false,  
  }   
  }, {
    sequelize,
    modelName: 'BookStore',
    tableName: 'book_stores',
    timestamps: false
  });
  return BookStore;
};