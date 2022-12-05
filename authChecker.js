const passport = require("passport");

module.exports = (req, res, next) => {
  passport.authenticate("jwt", (error, user, info) => {
    if (error) {
      return next(error);
    }
    if (!user) {
      return res.status(401).json({
        message: "Authentication Failed",
      });
    }
    req.user = user;

    return next();
  })(req, res, next);
};
