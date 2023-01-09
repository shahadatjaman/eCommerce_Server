const Order = require("../../../models/Vendor/Order");
const { newTime, isValidID } = require("../../../utils");
const Product = require("../../../models/Vendor/Product/Product");
module.exports = {
  // Create new order
  async creareOrder(req, res) {
    const { _id } = req.user;

    const { products, total, paid, currency } = req.body;

    const newOrder = new Order({
      user_id: _id,
      products,
      total,
      paid,
      currency,
      status: "pending",
      createdAt: newTime(),
      updatedAt: newTime(),
    });

    const order = await newOrder.save();

    res.status(200).json({
      message: "Order has been received",
      order,
    });
  },
  //get order by id
  async getOrder(req, res) {
    const { order_id } = req.params;

    const isvalid = isValidID({ product_id: order_id });

    if (!isvalid) {
      return res.status(400).json({
        error: "order_id is not a valid ID",
      });
    }
    const order = await Order.findById(order_id);

    if (!order) {
      return res.status(400).json({
        message: "Order not found!",
        order,
      });
    } else {
      return res.status(200).json({
        order,
      });
    }
  },
  // Get orders
  async getOrders(req, res) {
    const { _id } = req.user;

    let orders = await Order.find();

    let filteredOrder = [];

    // for (var i = 0; i < orders.length; i++) {
    //   const products = orders[i].products;
    //   for (var j = 0; j < products.length; j++) {
    //     if (products[j].vendor_id.toString() === _id.toString()) {
    //       products[j] = { ...products[j], user_id: orders[i].user_id };
    //       console.log(products[j]);
    //       filteredOrder = [...filteredOrder, products[j]];
    //     }
    //   }
    // }

    res.status(200).json({
      orders: filteredOrder,
    });
  },
};
