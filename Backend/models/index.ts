import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';
import { DataTypes } from 'sequelize';

const { basename: baseNameFunction } = path;
const basename = baseNameFunction(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db: any = {};

let sequelize: Sequelize;
if (config.use_env_variable) {
  const databaseUrl = process.env[config.use_env_variable];
  if (!databaseUrl) {
    throw new Error('Database URL not found in environment variables');
  }
  sequelize = new Sequelize(databaseUrl, config);
} else {
  const { database, username, password } = config;
  if (!database || !username || !password) {
    throw new Error('Database configuration missing');
  }
  sequelize = new Sequelize(database, username, password, config);
}

fs
  .readdirSync(__dirname)
  .filter((file: string) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.ts' &&
      file.indexOf('.test.ts') === -1
    );
  })
  .forEach((file: string) => {
    const model = require(path.join(__dirname, file)).default(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
