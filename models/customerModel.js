module.exports = (sequelize, Sequelize) => {
  const Customer = sequelize.define(
    'customer',
    {
      name: { type: Sequelize.STRING, allowNull: false },
      email: { type: Sequelize.STRING, allowNull: false },
      address: { type: Sequelize.STRING, allowNull: false },
      phone: { type: Sequelize.STRING, allowNull: false },
    },
    { paranoid: true }
  );

  return Customer;
};
