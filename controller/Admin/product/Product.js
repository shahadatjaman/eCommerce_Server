const Discount = require("../../../models/Vendor/Product/Discount");
const Product = require("../../../models/Vendor/Product/Product");

const { escape } = require("../../../utils");
const { serverError, clientError } = require("../../../utils/error");

module.exports = {
  async getProducts_with_text(req, res) {
    const { name } = req.params;
    const { _id } = req.user;

    const name_search_regex = new RegExp(escape(name.trim()), "i");

    const products = await Product.find({
      name: name_search_regex,
      user_id: _id,
    });
    res.status(200).json({
      products,
    });
  },
  async update_product_discount(req, res) {
    const { _id } = req.user;
    const { discount_percent, products_id } = req.body;

    if (discount_percent) {
      try {
        const updatedProducts = await Discount.update(
          { product_id: [...products_id] },
          { $set: { discount_percent: Number(discount_percent) } }
        );
        return res.status(200).json({
          products: updatedProducts,
        });
      } catch (error) {
        console.log(error);
        return serverError(res, "There was an server error!");
      }
    } else {
      return clientError(
        res,
        "Product discount(discount_percent) must be provid!"
      );
    }
  },
  async update_product_price(req, res) {
    const { _id } = req.user;
    const { price, products_id, amount_type } = req.body;

    // Increas products price

    if (price && amount_type === "increase") {
      for (var i = 0; i <= products_id.length - 1; i++) {
        try {
          const product = await Product.findOne({
            _id: products_id[i],
            user_id: _id,
          });

          await Product.findOneAndUpdate(
            { _id: products_id[i] },
            { $set: { price: Number(product.price) + Number(Math.abs(price)) } }
          );
        } catch (err) {
          return clientError(res, "Product not found!");
        }
      }

      return res.status(200).json({
        message: `The prices of ${products_id.length} products were changed.`,
      });
    }

    // Reduce products price

    if (price && amount_type === "reduce") {
      let unchangedProducts = 0;

      for (var i = 0; i <= products_id.length - 1; i++) {
        try {
          const product = await Product.findOne({
            _id: products_id[i],
            user_id: _id,
          });

          if (product && Number(product.price) > Number(price)) {
            await Product.findOneAndUpdate(
              { _id: products_id[i] },
              {
                $set: {
                  price: Number(product.price) - Number(Math.abs(price)),
                },
              }
            );
          } else {
            unchangedProducts += 1;
          }
        } catch (err) {
          return clientError(res, "Product not found!");
        }
      }

      return res.status(200).json({
        message:
          unchangedProducts > 0
            ? `${unchangedProducts} products weren't changed because they can't cost less than USD ${price} `
            : `The prices of ${products_id.length} products were changed.`,
        ok: unchangedProducts === 0,
      });
    }
  },
  async set_product_visibility(req, res) {
    const { _id } = req.user;
    const { products_id, product_id, product_status } = req.body;
    // Update products status

    if (products_id) {
      for (var i = 0; i <= products_id.length - 1; i++) {
        const product = await Product.findOne({
          _id: products_id[i],
          user_id: _id,
        });

        if (product) {
          try {
            await Product.findOneAndUpdate(
              { _id: products_id[i] },
              {
                $set: {
                  product_status: product_status,
                },
              }
            );
          } catch (err) {
            return serverError(res, "There was an server error!");
          }
        } else {
          return clientError(res, "Product not found!");
        }
        return res.status(200).json({
          multiple: true,
          message:
            product_status === "active"
              ? `The ${products_id.length} selected products are now visible on your store.`
              : `The ${products_id.length} selected products were hidden from your store.`,
        });
      }
    }

    if (product_id) {
      const product = await Product.findOne({
        _id: product_id,
        user_id: _id,
      });

      if (product) {
        try {
          await Product.findByIdAndUpdate(
            { _id: product_id },
            {
              $set: {
                product_status: product_status,
              },
            }
          );

          await Product.findOne({ _id: product_id });

          return res.status(200).json({
            multiple: false,
            message:
              product_status === "active"
                ? "“I'm a product” is now visible on your store."
                : "“I'm a product” is now hiden on your store.",
          });
        } catch (err) {
          return serverError(res, "There was an server error!");
        }
      } else {
        return clientError(res, "Product not found!");
      }
    }
  },
  async get_products_by_cate_id(req, res) {
    const { category_id } = req.params;

    const products = await Product.find({
      product_status: "active",
      category_id,
    });

    res.status(200).json({
      products,
    });
  },
};
