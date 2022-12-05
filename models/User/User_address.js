const { Schema, model } = require("mongoose");

const { ObjectId } = Schema.Types;

const userAddressSchema = new Schema({
  user_id: {
    type: ObjectId,
    required: true,
  },
  company_name: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  street_address: {
    type: String,
    required: true,
  },
  town_city: {
    type: String,
    required: true,
  },
  state_country: {
    type: String,
    required: true,
  },
  postcode_zip: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    require: true,
  },
  order_note: String,
  createdAt: String,
});

module.exports = UserAddress = model("user-address", userAddressSchema);
