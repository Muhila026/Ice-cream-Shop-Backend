# Ice Cream Shop Backend

A Node.js backend API for managing an ice cream shop with TypeScript, Express, and MySQL.

## Features

- **Ice Cream Management**: CRUD operations for ice cream products
- **Customer Management**: Customer registration and management
- **Order Processing**: Create and manage orders with stock validation
- **Database Integration**: MySQL with Sequelize ORM
- **TypeScript**: Full TypeScript support
- **RESTful API**: Clean REST endpoints

## Database Schema

### Tables
1. **icecreams** - Product inventory
2. **customers** - Customer information
3. **orders** - Order records
4. **order_items** - Order line items

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=icecream_shop

   # Server Configuration
   PORT=3000
   NODE_ENV=development
   ```

4. Create the MySQL database:
   ```sql
   CREATE DATABASE icecream_shop;
   ```

## Running the Application

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm start
```

## API Endpoints

### Ice Creams
- `GET /api/icecreams` - Get all ice creams
- `GET /api/icecreams/:id` - Get ice cream by ID
- `POST /api/icecreams` - Create new ice cream
- `PUT /api/icecreams/:id` - Update ice cream
- `DELETE /api/icecreams/:id` - Delete ice cream
- `PATCH /api/icecreams/:id/stock` - Update stock

### Customers
- `GET /api/customers` - Get all customers
- `GET /api/customers/:id` - Get customer by ID
- `GET /api/customers/email/:email` - Get customer by email
- `POST /api/customers` - Create new customer
- `PUT /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Delete customer

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create new order
- `GET /api/orders/customer/:customerId` - Get orders by customer
- `GET /api/orders/stats/summary` - Get order statistics

## Testing with Postman

Import the Postman collection from `postman/IceCreamShop_Collection.json` and the environment from `postman/IceCreamShop_Environment.json`.

## Project Structure

```
src/
├── config/
│   └── database.ts          # Database configuration
├── controllers/
│   ├── iceCreamController.ts
│   ├── customerController.ts
│   └── orderController.ts
├── models/
│   ├── IceCream.ts
│   ├── Customer.ts
│   ├── Order.ts
│   ├── OrderItem.ts
│   └── index.ts
├── routes/
│   ├── iceCreamRoutes.ts
│   ├── customerRoutes.ts
│   └── orderRoutes.ts
├── utils/
│   └── appError.ts
└── index.ts                 # Main application file
```

## Technologies Used

- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Programming language
- **Sequelize** - ORM for MySQL
- **MySQL** - Database
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logger

## License

ISC #   I c e - c r e a m - S h o p - B a c k e n d  
 