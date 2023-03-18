const Role = require('./roleModel');

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    name: { type: Sequelize.STRING, allowNull: false },
    username: { type: Sequelize.STRING, allowNull: false, unique: true },
    email: { type: Sequelize.STRING, allowNull: false, unique: true },
    password: { type: Sequelize.STRING, allowNull: false },
    otp: { type: Sequelize.INTEGER },
    failed_attempts: { type: Sequelize.INTEGER },
  });

  User.associate = function (models) {
    User.belongsTo(models.Role, { foreignKey: 'roleId' });
  };

  return User;
};
