const db = require('../models');
const Medication = db.medications;

const getMedications = async (req, res) => {
  try {
    const medications = await Medication.findAll();
    res.status(200).send({ data: medications });
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

const addMedication = async (req, res) => {
  try {
    const { name, description, quantity, price } = req.body;
    if (!name || !description || !quantity || !price) {
      return res.status(400).send({ error: 'All fields are required' });
    }

    const medication = await Medication.create({
      name,
      description,
      quantity,
      price_per_unit: price,
    });

    if (medication) {
      return res
        .status(201)
        .send({ message: 'Successfully added the medication' });
    }
    res
      .status(409)
      .send({ error: 'Could not process request, please check the data' });
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

const updateMedication = async (req, res) => {
  try {
    const { id, name, description, quantity, price } = req.body;
    if (!id || !name || !description || !quantity || !price) {
      return res.status(400).send({ error: 'All fields are required' });
    }

    const medication = await Medication.findByPk(id);
    if (medication) {
      medication.name = name;
      medication.description = description;
      medication.quantity = quantity;
      medication.price_per_unit = price;
      await medication.save();
      return res
        .status(201)
        .send({ message: 'Successfully updated the medication' });
    } else {
      return res.status(404).send({ error: 'Medication not found' });
    }
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

const softDeleteMedication = async (req, res) => {
  try {
    const id = req.params.id;
    await Medication.destroy({
      where: {
        id: id,
      },
    });
    return res.status(200).send({ message: 'Deleted medication' });
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

const deleteMedication = async (req, res) => {
  try {
    const id = req.params.id;
    await Medication.destroy({
      where: {
        id: id,
      },
      force: true,
    });
    return res.status(200).send({ message: 'Permanently deleted medication' });
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

module.exports = {
  getMedications,
  addMedication,
  updateMedication,
  softDeleteMedication,
  deleteMedication,
};
