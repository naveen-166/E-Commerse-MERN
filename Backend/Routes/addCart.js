const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const Product = require('../Models/Products');

router.post('/', async (req, res) => {
  const { email, prod_id, quantity } = req.body;

  try {

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // 2️⃣ Find the product by prod_id
    const product = await Product.findOne({ prod_id });
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // 3️⃣ Check if product is already in the cart
    const existingCartItem = user.cart.find(item => item.productId.equals(product._id));

    if (existingCartItem) {
      // 🔄 Update quantity
      existingCartItem.quantity += quantity;
      existingCartItem.addedAt = new Date();
    } else {
      // ➕ Add new item
      user.cart.push({
        productId: product._id,
        quantity,
        addedAt: new Date()
      });
    }

    // 💾 Save user
    await user.save();

    res.status(200).json({ message: 'Product added to cart successfully' });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
