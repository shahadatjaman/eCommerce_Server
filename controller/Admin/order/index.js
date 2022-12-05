const Order = require("../../../models/Vendor/Order");
const { newTime, isValidID } = require("../../../utils");

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

    const orders = await Order.find({ user_id: _id });

    res.status(200).json({
      orders,
    });
  },
};
