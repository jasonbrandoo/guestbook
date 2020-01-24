const jwt = require('jsonwebtoken');

const withAuth = (req, res, next) => {
  const { token } = req.signedCookies;
  if (!token) {
    res.status(401);
    res.json({
      message: 'Token not provided',
    });
    res.end();
  } else {
    jwt.verify(token, 'anjing', (err, decoded) => {
      if (err) {
        res.status(401);
        res.json({
          message: 'Invalid token provided',
        });
        res.end();
      } else {
        req.data = decoded;
        next();
      }
    });
  }
};

module.exports = withAuth;
