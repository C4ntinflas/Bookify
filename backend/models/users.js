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
    static associate({ Reviews, UserInventory}) {
      // define association here
      Users.hasMany(Reviews, {
        foreignKey: 'user_id'
      });

      Users.hasMany(UserInventory, {
        foreignKey: 'user_id'
      });
    }
  }
  Users.init({
    user_id: {
      type: DataTypes.STRING, 
      primaryKey: true,
      autoIncrement: true
  },
   user_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
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