const db = require('../models');
const Customer = db.customers;

const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.status(200).send({ data: customers });
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

const addCustomer = async (req, res) => {
  try {
    const { name, email, address, phone } = req.body;
    if (!name || !email || !address || !phone) {
      return res.status(400).send({ error: 'All fields are required' });
    }

    const customer = await Customer.create({
      name,
      email,
      address,
      phone,
    });

    if (customer) {
      return res
        .status(201)
        .send({ message: 'Successfully added the customer' });
    }
    res
      .status(409)
      .send({ error: 'Could not process request, please check the data' });
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

const updateCustomer = async (req, res) => {
  try {
    const { id, name, email, address, phone } = req.body;
    if (!id || !name || !email || !address || !phone) {
      return res.status(400).send({ error: 'All fields are required' });
    }

    const customer = await Customer.findByPk(id);
    if (customer) {
      customer.name = name;
      customer.email = email;
      customer.address = address;
      customer.phone = phone;
      await customer.save();
      return res
        .status(201)
        .send({ message: 'Successfully updated the customer' });
    } else {
      return res.status(404).send({ error: 'Customer not found' });
    }
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

const softDeleteCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    await Customer.destroy({
      where: {
        id: id,
      },
    });
    return res.status(200).send({ message: 'Deleted customer' });
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    await Customer.destroy({
      where: {
        id: id,
      },
      force: true,
    });
    return res.status(200).send({ message: 'Permanently deleted customer' });
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

module.exports = {
  getCustomers,
  addCustomer,
  updateCustomer,
  softDeleteCustomer,
  deleteCustomer,
};
