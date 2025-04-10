const express = require('express');
const router = express.Router();
const Order = require('../Models/Orders');
const Product = require('../Models/Products');
const User = require('../Models/User');

// Place a new order
router.post('/', async (req, res) => {
  const {
    email,
    phone_no,
    products, // [{ prod_id, quantity }]
    paymentMethod,
    paymentStatus,
    billingAddress,
    shippingAddress
  } = req.body;

  try {
    // Fetch user
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    let totalAmount = 0;
    const orderedProducts = [];

    for (const item of products) {
      const product = await Product.findOne({ prod_id: item.prod_id });
      if (!product) return res.status(404).json({ message: `Product ${item.prod_id} not found` });

      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product.title}` });
      }

      const subtotal = item.quantity * product.price;
      totalAmount += subtotal;

      orderedProducts.push({
        prod_id: item.prod_id,
        title: product.title,
        quantity: item.quantity,
        price: product.price,
        subtotal
      });

      // ✅ Reduce stock
      product.stock -= item.quantity;
      await product.save();
    }

    // ✅ Create order
    const newOrder = new Order({
      email,
      phone_no,
      products: orderedProducts,
      paymentMethod,
      paymentStatus,
      totalAmount,
      billingAddress,
      shippingAddress
    });

    const savedOrder = await newOrder.save();

    // ✅ Add order summary to user
    const orderSummary = {
      orderId: savedOrder._id,
      products: orderedProducts,
      totalAmount,
      paymentMethod,
      paymentStatus,
      orderStatus: savedOrder.orderStatus,
      shippingAddress,
      orderDate: savedOrder.orderDate,
      deliveryDate: savedOrder.deliveryDate
    };

    user.orders.push(orderSummary);
    await user.save();

    res.status(201).json({
      message: 'Order placed successfully',
      orderId: savedOrder.orderId
    });
  } catch (err) {
    console.error('Order placement error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
