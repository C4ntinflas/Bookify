import { Model, DataTypes, Sequelize, Association, Optional } from 'sequelize';
import { Reviews } from './reviews';
import { UserInventory } from './userinventory';

interface UserAttributes {
  user_id: string;
  user_name: string;
  password: string;
  home_store: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'user_id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public user_id!: string;
  public user_name!: string;
  public password!: string;
  public home_store!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associations: {
    reviews: Association<User, Reviews>;
    userInventory: Association<User, UserInventory>;
  };
}

export function initUser(sequelize: Sequelize): void {
  User.init(
    {
      user_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: true,
      },
      user_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      home_store: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: false,
    }
  );
}

export function associateUser(): void {
  User.hasMany(Reviews, {
    foreignKey: 'user_id',
    as: 'reviews',
  });

  User.hasMany(UserInventory, {
    foreignKey: 'user_id',
    as: 'userInventory',
  });
}

