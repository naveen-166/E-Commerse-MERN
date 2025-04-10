// AdminOrderUpdate.js
const express = require('express');
const router = express.Router();
const Order = require('../Models/Orders');
const User = require('../Models/User');

router.put('/orders/:orderId', async (req, res) => {
  const { orderId } = req.params;
  const { orderStatus, deliveryDate } = req.body;

  try {
    // 👉 Update in Order schema
    const updatedOrder = await Order.findOneAndUpdate(
      { orderId }, // use custom orderId, not _id
      { $set: { orderStatus, deliveryDate } },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // 👉 Update in User schema (embedded order summary)
    await User.updateOne(
      { 'orders.orderId': updatedOrder.orderId },
      {
        $set: {
          'orders.$.orderStatus': orderStatus,
          'orders.$.deliveryDate': deliveryDate
        }
      }
    );

    res.json({ message: 'Order updated successfully', updatedOrder });
  } catch (err) {
    console.error('Error updating order:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
