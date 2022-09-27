// Sets up connection to database
const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

// If the app has the info for jawsdb it'll use that instead of the hardcoded env variables
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = sequelize;
