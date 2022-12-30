const passport = require("passport");
const User = require("../../models/User/User");

module.exports = {
  async authAsAdmin(req, res, next) {
    passport.authenticate("jwt", (error, user, info) => {
      if (error) {
        return next(error);
      }
      if (!user) {
        return res.status(401).json({
          message: "Authentication Failed",
        });
      }

      if (user.role !== "admin") {
        return res.status(401).json({
          message: "Access not allowed",
        });
      }

      req.user = user;

      return next();
    })(req, res, next);
  },

  async authAsUser(req, res, next) {
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
  },
};
