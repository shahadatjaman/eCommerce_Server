const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const createError = require("http-errors");

const User = require("../../models/User/User");

const { serverError, clientError } = require("../../utils/error");
const { isValidMongoID, tokenGenerate } = require("../../utils");

module.exports = {
  async addCustomUser(req, res) {
    let { username, email, password } = req.body;

    password = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password,
      avatar: "",
      provider: "user",
      createdAt: new Date().toISOString(),
    });

    const user = await newUser.save();

    const payload = {
      _id: user._id,
      username: user.username,
      email: user.email,
      provider: newUser.provider,
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
      message: "Successfully created",
      accessToken,
      refreshToken,
    });
  },
  async addSocialUser(req, res) {
    let { username, email, avatar } = req.body;

    const user = await User.findOne({
      email,
    });

    // If user already exist then create an accesstToken and refreshToken to login user
    if (user) {
      const payload = {
        _id: user._id,
        username: user.username,
        email: user.email,
        provider: user.provider,
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
        message: "Successful",
        accessToken,
        refreshToken,
      });
    } else {
      const newUser = new User({
        username,
        email,
        avatar,
        provider: "social ",
        createdAt: new Date().toISOString(),
      });

      const { _id, role, provider } = await newUser.save();

      const payload = {
        _id,
        username,
        email,
        avatar,
        provider,
        role,
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
        message: "Successfully created",
        accessToken,
        refreshToken,
      });
    }
  },
  async login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      if (user.provider === "user") {
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
              token: null,
            });
          }
        });
      } else {
        return res.status(400).json({
          message: "Your account was created with Google/Facebook",
        });
      }
    } else {
      return res.status(401).json({
        errors: {
          message: "Invalid User",
        },
      });
    }
  },
  // Get user by id
  async getUser(req, res) {
    const { user_id } = req.params;

    const user = await User.findOne({ _id: user_id });

    res.status(200).json({
      user,
    });
  },
  async getAccessToken(req, res) {
    const { refreshToken } = req.cookies;
    console.log("refreshToken", refreshToken);

    if (!refreshToken) return res.status(401).json({ message: "Unauthorized" });

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET_KEY,
      asyncHandler(async (err, decoded) => {
        if (err) return res.status(403).json({ message: "Forbidden" });

        const foundUser = await User.findOne({
          _id: decoded._id,
        }).exec();

        if (!foundUser)
          return res.status(401).json({ message: "Unauthorized" });

        const payload = {
          _id: foundUser._id,
          username: foundUser.username,
          email: foundUser.email,
        };
        const accessToken = tokenGenerate(
          {
            ...payload,
          },
          process.env.ACCESS_TOKEN_SECRET_KEY,
          process.env.ACCESS_TOKEN_EXPIRE
        );

        res.status(200).json({
          accessToken,
        });
      })
    );
  },
};
