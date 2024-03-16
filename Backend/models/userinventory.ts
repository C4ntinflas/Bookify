import { Model, DataTypes, Sequelize, Association, Optional } from 'sequelize';
import { User } from './users';
import { Book } from './book';

interface UserInventoryAttributes {
  inventory_id: number;
  user_id: number;
  book_id: number;
  quantity: number;
}

interface UserInventoryCreationAttributes extends Optional<UserInventoryAttributes, 'inventory_id'> {}

export class UserInventory extends Model<UserInventoryAttributes, UserInventoryCreationAttributes> implements UserInventoryAttributes {
  public inventory_id!: number;
  public user_id!: number;
  public book_id!: number;
  public quantity!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associations: {
    user: Association<UserInventory, User>;
    book: Association<UserInventory, Book>;
  };
}

export function initUserInventory(sequelize: Sequelize): void {
  UserInventory.init(
    {
      inventory_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'user_id',
        },
      },
      book_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Book',
          key: 'book_id',
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'UserInventory',
      tableName: 'user_inventories',
      timestamps: false,
    }
  );
}

export function associateUserInventory(): void {
  UserInventory.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user',
  });

  UserInventory.belongsTo(Book, {
    foreignKey: 'book_id',
    as: 'book',
  });
}
