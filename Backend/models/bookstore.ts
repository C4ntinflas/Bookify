import { Model, DataTypes, Sequelize } from "sequelize";

interface BookStoreAttributes {
  store_id: number;
  store_name: string;
  admin_user: string;
  password: string;
  address: string;
}

class BookStore extends Model<BookStoreAttributes> implements BookStoreAttributes {
  store_id!: number;
  store_name!: string;
  admin_user!: string;
  password!: string;
  address!: string;

  static associate({ Book, StoresBook }: { Book: any; StoresBook: any }) {
    BookStore.hasMany(Book, {
      foreignKey: 'store_id'
    });

    BookStore.belongsToMany(Book, {
      through: StoresBook,
      foreignKey: 'store_id'
    });
  }
}

export { BookStore }; // Export the BookStore class directly

export function initBookStore(sequelize: Sequelize): void {
  // Implementation of the initBookStore function
}

