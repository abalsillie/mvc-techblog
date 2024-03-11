const Sequelize = require('sequelize'); // require sequelize
require('dotenv').config(); // import from .env

const sequelize = process.env.JAWSDB_URL // JAWSDB_URL for HEROKU
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: 'localhost',
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

module.exports = sequelize; // export sequelize model
