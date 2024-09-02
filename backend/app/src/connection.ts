import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const database_name = process.env.DATABASE_NAME || '';
const username = process.env.USERNAME || '';
const password = process.env.PASSWORD || '';
const host = process.env.HOST || 'localhost';

const sequelize = new Sequelize(database_name, username, password, {
  host: host,
  dialect: 'mysql',
  logging: false, // Desativa o log de consultas SQL no console
});

export default sequelize;