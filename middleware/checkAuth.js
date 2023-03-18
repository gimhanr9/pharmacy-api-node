const jwt = require('jsonwebtoken');
const db = require('../models');
const Role = db.roles;
const User = db.users;

const checkAuth = (roles) => {
  return async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
      return res.status(401).send({ error: 'Authentication failed' });
    }

    try {
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      const user = await User.findByPk(decodedToken.id, { include: Role });
      const role = user.role.name;
      if (roles.includes(role)) {
        req.user = decodedToken;
        next();
      }
      res.status(401).send({ error: 'Authorization failed' });
    } catch (err) {
      return res.status(401).send({ error: 'Authentication failed' });
    }
  };
};

module.exports = checkAuth;
