import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import { IceCream } from '../models/IceCream';
import { Customer } from '../models/Customer';
import { Order } from '../models/Order';
import { OrderItem } from '../models/OrderItem';

dotenv.config();

console.log('Database Configuration:');
console.log('Host:', process.env.DB_HOST);
console.log('Port:', process.env.DB_PORT);
console.log('User:', process.env.DB_USER);
console.log('Database:', process.env.DB_NAME);

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'icecream_shop',
  logging: (msg) => console.log(msg),
  models: [IceCream, Customer, Order, OrderItem],
  define: {
    timestamps: true,
    underscored: true,
    paranoid: false,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Initialize database and create tables
const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    
    // Sync all models
    await sequelize.sync({ alter: true });
    console.log('Database tables have been synchronized.');
  } catch (error) {
    console.error('Unable to initialize database:', error);
    throw error;
  }
};

// Call initializeDatabase immediately
initializeDatabase();

export default sequelize; 