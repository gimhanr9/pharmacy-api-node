const Role = require('./roleModel');

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    name: { type: Sequelize.STRING, allowNull: false },
    username: { type: Sequelize.STRING, allowNull: false, unique: true },
    email: { type: Sequelize.STRING, allowNull: false, unique: true },
    password: { type: Sequelize.STRING, allowNull: false },
    role: {
      type: Sequelize.STRING,
      references: {
        model: Role,
        key: 'id',
      },
    },
    otp: { type: Sequelize.INTEGER },
    failed_attempts: { type: Sequelize.INTEGER },
  });

  return User;
};
