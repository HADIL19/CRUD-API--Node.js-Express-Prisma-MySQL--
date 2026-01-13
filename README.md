# CRUD API with Node.js, Express, and Prisma (MySQL)

This project is a simple **CRUD API** built with **Node.js, Express, Prisma, and MySQL**.  
It demonstrates a clean workflow where **Prisma manages the database schema** and **Express handles API routes**.

---

## Features

- Create, Read, Update, Delete **Users**
- Prisma handles **schema definition, migrations, and database operations**
- MySQL is used as the database engine
- Fully testable with Postman or similar tools
- Optional: Visualize and edit data with **Prisma Studio**

---

## Technologies

- **Node.js** - JavaScript runtime  
- **Express.js** - Web framework  
- **Prisma** - ORM for database management  
- **MySQL** - Database engine  
- **Cors** - Handle cross-origin requests  
- **dotenv** - Environment variable management  

---

## Database Setup

1. Install **MySQL Server** locally.  
2. Open terminal or MySQL CLI and connect:
    ```bash
    mysql -u root -p
    ```
    Enter your password.

3. Create the database:
    ```sql
    CREATE DATABASE crud_db;
    EXIT;
    ```

4. Update `.env`:
    ```env
    DATABASE_URL="mysql://root:YOUR_PASSWORD@localhost:3306/crud_db"
    ```

> Prisma requires the database to exist, but it will **create tables automatically**.

---

## Prisma Workflow

### 1. Define models in `schema.prisma`
```prisma
model User {
  id    Int    @id @default(autoincrement())
  name  String
  email String @unique
}
```

## 2. Apply changes to database
npx prisma migrate dev --name init


Prisma generates SQL based on the model

Creates tables in MySQL

Generates Prisma Client for code usage

## 3. CRUD operations

Use Prisma Client in your Node.js code:

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a user
await prisma.user.create({ data: { name: "Alice", email: "alice@example.com" } });

// Get all users
const users = await prisma.user.findMany();

## 4. Visualize data
npx prisma studio


Opens a browser GUI to view and edit database content.

API Endpoints
Method	Endpoint	Description
POST	/users	Create a new user
GET	/users	Get all users
GET	/users/:id	Get a user by ID
PUT	/users/:id	Update a user by ID
DELETE	/users/:id	Delete a user by ID

## Notes & Best Practices

Prisma is the source of truth:

You never manually create tables in MySQL after initial DB creation.

All schema changes are done via schema.prisma + prisma migrate dev.

SQLite alternative for learning:

Replace MySQL with SQLite in schema.prisma:

datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}


Prisma will create the .db file automatically, no MySQL needed.

Production advice:

Use MySQL or PostgreSQL for real projects.

Never mix Prisma migrations with manual SQL changes. 
