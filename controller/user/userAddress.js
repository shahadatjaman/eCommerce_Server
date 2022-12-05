const UserAddress = require("../../models/User/User_address");

const userAddressValidations = require("../../validation/userAddressValidation");

module.exports = {
  async userAddress(req, res) {
    const { _id } = req.user;
    const userAddress = await UserAddress.findOne({ user_id: _id });

    ({
      company_name,
      country,
      street_address,
      town_city,
      state_country,
      postcode_zip,
      phone,
    } = req.body);

    if (userAddress) {
    }

    const { errors, isValid } = userAddressValidations({
      company_name,
      country,
      street_address,
      town_city,
      state_country,
      postcode_zip,
      phone,
    });

    if (!isValid) {
      return res.status(400).json({ errors });
    }

    if (userAddress) {
      let updatedUserAddress = await UserAddress.findOneAndUpdate(
        {
          user_id: userAddress.user_id,
        },
        req.body,
        { new: true }
      );

      return res.status(200).json({ updatedUserAddress });
    }

    let newUserAddress = new UserAddress({
      user_id: _id,
      company_name,
      country,
      street_address,
      town_city,
      state_country,
      postcode_zip,
      phone,
      createdAt: new Date().toISOString(),
    });
    let savedUserAddress = await newUserAddress.save();

    return res.status(200).json({ data: savedUserAddress });
  },
  async getUserAddress(req, res) {
    const { _id } = req.user;
    const user_address = await UserAddress.findOne({ user_id: _id });
    if (user_address) {
      return res.status(200).json({ user_address });
    } else {
      return res.status(400).json({
        message: "User address not found!",
      });
    }
  },
};
