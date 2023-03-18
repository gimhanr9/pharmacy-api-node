module.exports = (sequelize, Sequelize) => {
  const MedicationCategory = sequelize.define('medication_category', {});

  return MedicationCategory;
};
