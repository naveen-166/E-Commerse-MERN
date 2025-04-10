const express = require('express');
const router = express.Router();
const Product = require('../Models/Products'); // adjust path if needed

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});

module.exports = router;
