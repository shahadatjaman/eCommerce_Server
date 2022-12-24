const bcrypt = require("bcryptjs");
const User = require("../../../models/User/User");
const { tokenGenerate } = require("../../../utils");

module.exports = {
  async login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      bcrypt.compare(password, user.password, (err, isvalid) => {
        if (err) {
          throw createError(err);
        }

        if (isvalid) {
          const payload = {
            _id: user._id,
            username: user.username,
            email: user.email,
          };
          const accessToken = tokenGenerate(
            {
              ...payload,
            },
            process.env.ACCESS_TOKEN_SECRET_KEY,
            process.env.ACCESS_TOKEN_EXPIRE
          );
          const refreshToken = tokenGenerate(
            {
              ...payload,
            },
            process.env.REFRESH_TOKEN_SECRET_KEY,
            process.env.REFRESH_TOKEN_EXPIRE
          );

          res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 31536000,
          });

          return res.status(200).json({
            accessToken,
            refreshToken,
          });
        } else {
          return res.status(400).json({
            message: "Your email or password is incorrect",
          });
        }
      });
    } else {
      return res.status(401).json({
        error: "Invalid User!",
      });
    }
  },
};
