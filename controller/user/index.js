const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const randomstring = require("randomstring");

const createError = require("http-errors");

const User = require("../../models/User/User");

const { serverError, clientError } = require("../../utils/error");
const { isValidMongoID, tokenGenerate, newTime } = require("../../utils");

const htmlUI = require("./html");

const sendEmail = require("../../utils/sendEmail");

const cloudinary = require("../../utils/cloudinaryConfg");

module.exports = {
  async addCustomUser(req, res) {
    let { firstName, lastName, email, password } = req.body;

    password = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      avatar: "",
      provider: "user",
      code: "0",
      createdAt: new Date().toISOString(),
    });

    const user = await newUser.save();

    const payload = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
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
    let { firstName, lastName, email, avatar } = req.body;

    const user = await User.findOne({
      email,
    });

    // If user already exist then create an accesstToken and refreshToken to login user
    if (user) {
      const payload = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
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
        firstName,
        lastName,
        email,
        avatar,
        provider: "social ",
        createdAt: new Date().toISOString(),
      });

      const { _id, role, provider } = await newUser.save();

      const payload = {
        _id,
        firstName,
        lastName,
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
              firstName: user.firstName,
              lastName: user.lastName,
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
      return res.status(400).json({
        message: "Invalid User",
        status: 400,
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
  // Forget password
  async forgetPassword(req, res) {
    const { email } = req.params;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(200).json({
        message: "Invlid Email Address, Please Try another wasy.",
        status: 400,
      });
    } else {
      if (user.provider !== "user") {
        return res.status(200).json({
          message:
            "Your account hass been created with social media, please try with them.",
          status: 400,
        });
      }

      const randomCode = randomstring.generate({
        length: 10,
        charset: "alphabetic",
      });

      const result = await sendEmail(
        email,
        "Xpart,Very Your Account!",
        htmlUI(randomCode)
      );

      if (result) {
        const token = tokenGenerate(
          {
            createdAt: newTime(),
            code: randomCode,
          },
          process.env.VERIFY_CODE_SECRET_KEY,
          process.env.VERIFY_TOKEN_EXPIRE
        );

        const updatedUser = await User.findOneAndUpdate(
          { email },
          { code: JSON.stringify(token) },
          {
            new: true,
          }
        );

        if (updatedUser) {
          return res.status(200).json({
            message: "Verification code send, Check your gmail!",
            status: 200,
            email,
          });
        } else {
          return serverError(
            res,
            "There was a server error!, Please try agin!"
          );
        }
      } else {
        return serverError(res, "There was a server error!, Please try agin!");
      }
    }
  },

  // verify code
  async verifyCode(req, res) {
    const { email } = req.params;

    const { code } = req.body;
    const user = await User.findOne({ email });

    jwt.verify(
      JSON.parse(user.code),
      process.env.VERIFY_CODE_SECRET_KEY,
      function (err, decoded) {
        if (err) {
          return res.status(400).json({
            error: "Invalid code",
          });
        }

        if (decoded.code === code) {
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
            message: "Verification success",
            status: 200,
            code: decoded.code,
            accessToken,
            refreshToken,
          });
        }

        return res.status(200).json({
          decoded,
        });
      }
    );
  },

  // chech verification code validity
  async checkCodeValidity(req, res) {
    const { email } = req.params;

    const user = await User.findOne({ email });

    // if user doesnt exist, or if exist then check verification code is valid or not
    if (!user) {
      return res.status(400).json({
        error: "Invalid user",
      });
    }

    if (user.code) {
      jwt.verify(
        JSON.parse(user.code),
        process.env.VERIFY_CODE_SECRET_KEY,
        (err, decoded) => {
          if (err) {
            return res.status(200).json({
              error: "Invalid code",
              status: 400,
            });
          }

          const createdAt = new Date(decoded.createdAt);
          const currentTime = new Date();

          var difference = (a, b) => {
            if (a < b) {
              return Math.abs(b - a);
            } else {
              return Math.abs(b + 60 - a);
            }
          };
          const getDif = difference(
            createdAt.getSeconds(),
            currentTime.getSeconds()
          );

          return res.status(200).json({
            status: 200,
            validTime: getDif,
          });
        }
      );
    }
  },

  // Change password
  async changePassword(req, res) {
    const { _id } = req.user;

    let { password, new_password } = req.body;

    const user = await User.findById(_id);

    if (user.provider === "user") {
      bcrypt.compare(password, user.password, async (err, isvalid) => {
        if (err) {
          throw createError(err);
        }

        if (isvalid) {
          new_password = await bcrypt.hash(new_password, 10);

          console.log(new_password);

          await User.findOneAndUpdate(
            { _id: _id },
            { password: new_password },
            { new: true }
          );

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
            message: "Your password is incorrect",
            token: null,
            status: 400,
          });
        }
      });
    } else {
      return res.status(400).json({
        message: "Your account was created with Google/Facebook",
        status: 400,
      });
    }
  },

  // Create new password
  async createNewPassword(req, res) {
    const { _id } = req.user;
    let { new_password } = req.body;

    new_password = await bcrypt.hash(new_password, 10);

    const updateduser = await User.findByIdAndUpdate(
      _id,
      {
        password: new_password,
      },
      {
        new: true,
      }
    );

    if (updateduser) {
      return res.status(200).json({
        message: "Password has been changed!",
        status: 200,
      });
    } else {
      return serverError(res, "There was an server error!");
    }
  },

  // Remove user account
  async removeUserAccount(req, res) {
    const { email } = req.body;
    const { _id } = req.user;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invlid email address",
        status: 400,
      });
    }

    const deletedUser = await User.findByIdAndDelete(_id);

    if (deletedUser) {
      return res.status(200).json({
        message: "Your account hass been deleted!",
        status: 200,
      });
    } else {
      return serverError(res, "There was aan server error!");
    }
  },

  // Upload avatar
  async uploadUserAvatar(req, res) {
    const { _id } = req.user;
    const file = req.file;
    cloudinary.v2.uploader.upload(file.path, async (error, result) => {
      if (error) {
        // handle error
        return res.status(400).send(error);
      }
      // result contains the uploaded image details

      try {
        const user = await User.findByIdAndUpdate(
          _id,
          { avatar: result.secure_url },
          { new: true }
        );

        return res.status(200).json({
          status: 200,
          avatar: user.avatar,
        });
      } catch (error) {
        return serverError(res, "There was an server error!");
      }
    });
  },
};
