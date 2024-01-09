'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init({
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,  
  },
   user_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
    checked_books: {
      type: DataTypes.STRING,
      allowNull: false,  
  }, 
    home_store: {
      type: DataTypes.STRING,
      allowNull: false,  
  } 
  }, {
    sequelize,
    modelName: 'Users',
    tableName: 'users',
    timestamps: false
  });
  return Users;
};