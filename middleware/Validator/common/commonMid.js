const commonMiddleware = (err, req, res, next) => {
  if (err) {
    return res.status(400).json({
      errors: err,
    });
  } else {
    next();
  }
};

module.exports = commonMiddleware;
