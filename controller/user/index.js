const bcrypt = require("bcryptjs");

const createError = require("http-errors");

const User = require("../../models/User/User");

const tokenGenerate = require("../../helper/jwtGenerator ");
const { serverError, clientError } = require("../../utils/error");

module.exports = {
  async addCustomUser(req, res) {
    let { username, email, password } = req.body;

    password = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password,
      avatar: "",
      createdAt: new Date().toISOString(),
    });

    const user = await newUser.save();

    const token = tokenGenerate({
      _id: user._id,
      username,
      email,
      role: user.role,
    });

    return res.status(200).json({
      message: "Successfully created",
      token,
    });
  },
  async addSocialUser(req, res, next) {
    let { username, email, password, avatar } = req.body;

    if (password) {
      next();
    } else {
      const user = await User.findOne({
        email,
      });

      if (user) {
        let { _id, username, email, avatar, role } = user;

        const token = tokenGenerate({ _id, username, email, avatar, role });
        return res.status(200).json({
          message: "Successful",
          token,
        });
      } else {
        const newUser = new User({
          username,
          email,
          avatar,
          createdAt: new Date().toISOString(),
        });

        const { _id, role } = await newUser.save();

        const token = tokenGenerate({
          _id,
          username,
          email,
          avatar,
          role,
        });

        return res.status(200).json({
          message: "Successfully created",
          token,
        });
      }
    }
  },
  async login(req, res) {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user) {
      bcrypt.compare(password, user.password, (err, isvalid) => {
        if (err) {
          throw createError(err);
        }

        if (isvalid) {
          const token = tokenGenerate({
            _id: user._id,
            username: user.username,
            email: user.email,
          });
          return res.status(200).json({
            token,
          });
        } else {
          return res.status(400).json({
            message: "Your email or password is incorrect",
            token: null,
          });
        }
      });
    } else {
      return res.status(401).json({
        errors: {
          message: "Invalid User",
        },
      });
    }
  },
};
