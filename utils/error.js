module.exports = {
  serverError(res, msg) {
    res.status(500).json({
      message: msg,
    });
  },
  clientError(res, msg) {
    res.status(200).json({
      message: msg,
    });
  },
};
