const jwt = require('jsonwebtoken');
function hasRoles(allowedRoles) {
  return (req, res, next) => {
    if (allowedRoles.includes(req.user.roles)) {
      next();
    } else {
      res.status(403).send('You are not authorized to access this resource');
    }
  };
}

module.exports = hasRoles;