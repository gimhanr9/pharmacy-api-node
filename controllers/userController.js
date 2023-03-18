const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
const Role = db.roles;
const User = db.users;

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [{ model: Role, as: 'role' }],
    });
    res.status(200).send({ data: users });
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

const addUser = async (req, res) => {
  try {
    const { name, username, email, password, roleId } = req.body;
    if (!name || !username || !email || !password || !roleId) {
      return res.status(400).send({ error: 'All fields are required' });
    }
    const existingUsername = await User.findOne({
      where: { username: username },
    });
    if (existingUsername) {
      return res.status(409).send({ error: 'Username already exists' });
    }
    const existingEmail = await User.findOne({
      where: { email: email },
    });
    if (existingEmail) {
      return res.status(409).send({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
      otp: 0,
      failedAttempts: 0,
      roleId,
    });

    if (user) {
      const token = jwt.sign(
        {
          id: user.id,
          username: username,
          email: email,
          roleId: roleId,
          name: name,
        },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
      );

      return res.status(201).send({ data: token });
    }
    res
      .status(409)
      .send({ error: 'Could not process request, please check the data' });
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

const authenticateUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send({ error: 'All fields are required' });
    }
    const user = await User.findOne({ where: { username: username } });
    if (user) {
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        const token = jwt.sign(
          {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            name: user.name,
          },
          process.env.SECRET_KEY,
          { expiresIn: '24h' }
        );

        return res.status(201).send({ data: token });
      }
      return res.status(401).send({ error: 'Invalid credentials' });
    }
    return res.status(401).send({ error: 'Invalid credentials' });
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

module.exports = {
  getUsers,
  addUser,
  authenticateUser,
};
