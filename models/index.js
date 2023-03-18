const Sequelize = require('sequelize');
const dbConfig = require('../config/dbConfig');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./userModel')(sequelize, Sequelize);
db.roles = require('./roleModel')(sequelize, Sequelize);
db.medications = require('./medicationModel')(sequelize, Sequelize);
db.customers = require('./customerModel')(sequelize, Sequelize);

db.medications.belongsToMany(db.customers, {
  through: 'purchases',
  foreignKey: 'medicationId',
  otherKey: 'customerId',
});
db.customers.belongsToMany(db.medications, {
  through: 'purchases',
  foreignKey: 'customerId',
  otherKey: 'medicationId',
});

module.exports = db;
