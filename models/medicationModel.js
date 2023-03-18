module.exports = (sequelize, Sequelize) => {
  const Medication = sequelize.define(
    'medication',
    {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      price_per_unit: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
    },
    { paranoid: true }
  );

  return Medication;
};
