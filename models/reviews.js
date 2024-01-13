'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reviews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Book }) {
      // define association here
      Reviews.belongsTo(Book, {
        foreignKey: 'book_id'
      });
    }
  }
  Reviews.init({
    rating_id:
    { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    rating:
     { 
      type: DataTypes.INTEGER,
      allowNull:false
      
    },
    user_comment:
    { 
      type: DataTypes.INTEGER,
      allowNull:false
    },
    book_id:
    { 
      type: DataTypes.INTEGER,
      allowNull:false,
      references: {
        model: 'Book',
        key: 'book_id',
      },
    },
  }, {
    sequelize,
    modelName: 'Reviews',
    tableName: 'reviews'
  });
  return Reviews;
};

module.exports = Reviews;