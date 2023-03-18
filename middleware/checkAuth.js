const jwt = require('jsonwebtoken');
const db = require('../models');
const Role = db.roles;
const User = db.users;

const checkAuth = (roles) => {
  return async (req, res, next) => {
    try {
      const token = req.headers['x-access-token'];

      if (!token) {
        return res.status(401).send({ error: 'Authentication failed' });
      } else {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findByPk(decodedToken.id, { include: Role });
        if (!user) {
          return res.status(401).send({ error: 'Authorization failed' });
        } else {
          const role = user.role.name;
          if (roles.includes(role)) {
            req.user = decodedToken;
            next();
          } else {
            return res.status(401).send({ error: 'Authorization failed' });
          }
        }
      }
    } catch (err) {
      return res.status(401).send({ error: 'Authentication failed' });
    }
  };
};

module.exports = checkAuth;
