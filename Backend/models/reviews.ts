import { Model, DataTypes, Sequelize, Optional, Association } from 'sequelize';
import { Book } from './book'; // Ensure that this import is correct
import { User } from './users'; // Ensure that this import is correct

interface ReviewsAttributes {
  rating_id: number;
  rating: number;
  user_comment: string;
  book_id: number;
}

interface ReviewsCreationAttributes extends Optional<ReviewsAttributes, 'rating_id'> {}

export class Reviews extends Model<ReviewsAttributes, ReviewsCreationAttributes> implements ReviewsAttributes {
  public rating_id!: number;
  public rating!: number;
  public user_comment!: string;
  public book_id!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associations: {
    book: Association<Reviews, Book>;
    user: Association<Reviews, User>;
  };
}

export function initReviews(sequelize: Sequelize): void {
  Reviews.init(
    {
      rating_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_comment: {
        type: DataTypes.STRING, // Corrected type to string
        allowNull: false,
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
      modelName: 'Reviews',
      tableName: 'reviews',
    }
  );
}

export function associateReviews(): void {
  Reviews.belongsTo(Book, {
    foreignKey: 'book_id',
    as: 'book',
  });

  Reviews.belongsTo(User, { // Changed Users to User
    foreignKey: 'user_id',
    as: 'user',
  });
}
