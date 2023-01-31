const Discount = require("../../../models/Vendor/Product/Discount");
const Product = require("../../../models/Vendor/Product/Product");
const Variation = require("../../../models/Vendor/Product/Products_variations");

const VariationOption = require("../../../models/Vendor/Product/Product_variations_options");
const Rating = require("../../../models/Vendor/Product/Rating");

module.exports = {
  async get_products(req, res) {
    const {
      category_id,
      minPrice,
      maxPrice,
      queryText,
      sortByName,
      sortByPrice,
      topRating,
    } = req.body;

    let name_search_regex = null;
    if (queryText) {
      name_search_regex = new RegExp(escape(queryText?.trim()), "i");
    }

    const { from, to } = req.params;

    const pipelineOne = [
      {
        $match: {
          product_status: "active",
        },
      },
      sortByName
        ? {
            $sort: { name: sortByName },
          }
        : { $skip: Number(from) },
      sortByPrice
        ? {
            $sort: { price: sortByPrice },
          }
        : { $skip: Number(from) },
      maxPrice
        ? {
            $match: {
              price: { $lte: Number(maxPrice), $gte: Number(minPrice) },
            },
          }
        : { $skip: Number(from) },
      queryText
        ? {
            $match: { name: name_search_regex },
          }
        : { $skip: Number(from) },
      category_id
        ? {
            $match: {
              category_id: category_id,
            },
          }
        : { $skip: Number(from) },
      topRating
        ? {
            $sort: {
              rating: topRating,
            },
          }
        : { $skip: Number(from) },
      {
        $skip: Number(from),
      },
      {
        $limit: Number(to) === 0 ? 1 : Number(to),
      },
    ];

    const products = await Product.aggregate([...pipelineOne]);

    for (var i = 0; i < products.length; i++) {
      let variation = await Variation.find({
        product_id: products[i]._id,
      });

      let discount = await Discount.findOne({ product_id: products[i]._id });

      if (discount) {
        const amount =
          (Number(discount.discount_percent) / 100) * Number(products[i].price);

        const salePrice = Number(products[i].price) - amount;
        products[i] = {
          ...products[i],
          salePrice: salePrice,
          discount: Number(products[i].price),
        };
      }
      products[i] = {
        ...products[i],
        variation,
      };

      for (var j = 0; j < products[i].variation.length; j++) {
        let options = await VariationOption.find({
          product_variations_id: products[i].variation[j]._id,
        });

        products[i].variation[j] = {
          _id: products[i].variation[j].product_id,
          product_id: products[i].variation[j].product_id,
          variation_img: products[i].variation[j].variation_img,
          options,
        };
      }

      const rating = await Rating.aggregate([
        {
          $match: {
            product_id: products[i]._id.toString(),
          },
        },
        {
          $group: {
            _id: "",
            rating: { $sum: "$rating" },
          },
        },
        {
          $project: {
            _id: 0,
            TotalRating: "$rating",
          },
        },
      ]);

      products[i].total_rating = rating[0]?.TotalRating
        ? rating[0].TotalRating
        : 0;
    }

    res.status(200).json({
      products,
    });
  },
  async get_product_by_id(req, res) {
    const { product_id } = req.params;

    const rating = await Rating.aggregate([
      {
        $match: {
          product_id: product_id,
        },
      },
      {
        $group: {
          _id: "",
          rating: { $sum: "$rating" },
        },
      },
      {
        $project: {
          _id: 0,
          TotalRating: "$rating",
        },
      },
    ]);

    res.status(200).json({
      rating,
    });
  },
};
