import { Model, DataTypes, Sequelize } from 'sequelize';

interface BookAttributes {
  book_id: number;
  title: string;
  genre: string;
  location?: string;
  description: string;
  total_quantity: number;
  quantity: number;
  store_id: number;
}

class Book extends Model<BookAttributes> implements BookAttributes {
  book_id!: number;
  title!: string;
  genre!: string;
  location?: string;
  description!: string;
  total_quantity!: number;
  quantity!: number;
  store_id!: number;

  static associate({ BookStore, Reviews, StoresBook, UserInventory }: any) {
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

export { Book }; // Export the Book class directly

export function initBook(sequelize: Sequelize): void {
  Book.init({
    book_id: {
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
    });
}

