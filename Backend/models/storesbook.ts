import { Model, DataTypes, Sequelize, Optional, Association } from 'sequelize';
import { BookStore } from './bookstore';
import { Book } from './book';

interface StoresBookAttributes {
  quantity: number;
  store_id: number;
  book_id: number;
}

interface StoresBookCreationAttributes extends Optional<StoresBookAttributes, 'quantity'> {}

export class StoresBook extends Model<StoresBookAttributes, StoresBookCreationAttributes> implements StoresBookAttributes {
  public quantity!: number;
  public store_id!: number;
  public book_id!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associations: {
    bookStore: Association<StoresBook, BookStore>;
    book: Association<StoresBook, Book>;
  };
}

export function initStoresBook(sequelize: Sequelize): void {
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
          model: 'BookStore',
          key: 'store_id',
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
    },
    {
      sequelize,
      modelName: 'StoresBook',
      tableName: 'stores_books',
      timestamps: false,
    }
  );
}

export function associateStoresBook(): void {
  StoresBook.belongsTo(BookStore, {
    foreignKey: 'store_id',
    as: 'bookStore',
  });

  StoresBook.belongsTo(Book, {
    foreignKey: 'book_id',
    as: 'book',
  });
}
;
