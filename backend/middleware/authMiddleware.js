const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // get the token from the request header
  const token = req.header('x-auth-token');

  // check whether the token exists or not
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, please log in' });
  }

  try {
    // check the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};