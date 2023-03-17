module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define('role', {
    name: { type: Sequelize.STRING, allowNull: false },
  });

  return Role;
};

Role.belongsTo(companyData, { foreignKey: 'bankingId' });
companyData.hasOne(Bank, { foreignKey: 'bankId' });
