const Rating = require("../../../models/Vendor/Product/Rating");
const Product = require("../../../models/Vendor/Product/Product");
const { isValidID, newTime } = require("../../../utils");

module.exports = {
  // Create a product rating
  async createRating(req, res) {
    const { _id } = req.user;
    const { product_id, rating, text } = req.body;

    const ratings = await Rating.findOne({ product_id, user_id: _id });

    if (ratings) {
      // TODO: Update the rating
      await Rating.findOneAndUpdate(
        {
          product_id,
          user_id: _id,
        },
        {
          ...req.body,
          updatedAt: newTime(),
        },
        { new: true, upsert: true }
      );

      const productRating = await Rating.find({ product_id });

      return res.status(200).json({
        message: "Ok",
        productRating: productRating,
      });
    } else {
      // TODO: Create a new raing
      const newRating = new Rating({
        user_id: _id,
        product_id,
        rating: Number(rating),
        text,
        createdAt: newTime(),
        updatedAt: newTime(),
      });
      await newRating.save();

      const productRating = await Rating.find({ product_id });
      return res.status(200).json({
        productRating,
      });
    }
  },
  // Remove rating
  async removeRating(req, res) {
    const { _id } = req.user;

    const { product_id } = req.params;

    const removedRating = await Rating.findOneAndDelete({
      user_id: _id,
      product_id,
    });
    const ratings = await Rating.find({ product_id });

    const product = await Product.findById(product_id);

    if (product.tot_rating) {
      product.tot_rating -= Number(removedRating.rating);
      await product.save();
    }

    res.status(200).json({
      message: "Rating successfuly deleted!",
      removedRating,
      ratings,
    });
  },
  // get rating by id
  async getRating(req, res) {
    const { _id } = req.user;
    console.log(_id);
    const { product_id } = req.params;
    const rating = await Rating.findOne({ user_id: _id, product_id });

    res.status(200).json({
      rating,
    });
  },

  // Get ratings
  async getRatings(req, res) {
    const { product_id } = req.params;

    const isvalid = isValidID({ product_id });

    if (!isvalid) {
      return res.status(400).json({
        error: "Product ID is not valid",
      });
    }

    const ratings = await Rating.find({ product_id });
    res.status(200).json({
      ratings,
    });
  },
};
