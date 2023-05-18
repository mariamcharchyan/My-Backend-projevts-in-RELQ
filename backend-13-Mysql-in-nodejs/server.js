// const express = require('express')
// const { createPool }  = require('mysql2/promise')
// require("dotenv").config();

// const app = express();
// app.use(express.json());

// const pool = createPool({
//   host: process.env.MYSQL_HOST,
//   user: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PASSWORD,
//   database: process.env.MYSQL_DATABASE,
// });

// (async function () {
//     // await pool.query(` DROP TABLE IF EXISTS products;`);
//     // await pool.query(`DROP TABLE IF EXISTS users;`);
    

//     await pool.query(`
//         CREATE TABLE IF NOT EXISTS products (
//             id INT(11) NOT NULL AUTO_INCREMENT,
//             name VARCHAR(255) NOT NULL,
//             price DECIMAL(10,2) NOT NULL,
//             PRIMARY KEY (id)
//         );
//     `);
  
//     console.log("Products table created");


//     await pool.query(`
//         CREATE TABLE  IF NOT EXISTS users (
//             id INT(11) NOT NULL AUTO_INCREMENT,
//             name VARCHAR(255) NOT NULL,
//             email VARCHAR(255) NOT NULL,
//             password VARCHAR(255) NOT NULL,
//             PRIMARY KEY (id)
//         );
//     `);

//     console.log("Users table created");
// })();

// app.get('/', async (req, res) => {
//   res.send('hello');
// });

// app.listen(6000, () => {
//   console.log('listening on 6000 ');
// });

const express = require('express');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const app = express();
app.use(express.json());

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
  }
);

(async function() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    const Product = sequelize.define('product', {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      }
    });

    await Product.sync({ force: true });
    console.log('Product table created');

    const User = sequelize.define('user', {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });

    await User.sync({ force: true });
    console.log('User table created');

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

app.get('/', async (req, res) => {
  res.send('hello');
});

app.listen(6000, () => {
  console.log('listening on 6000');
});