const express = require('express');
const router = express.Router();
const Product = require('../Models/Products');
const { v4: uuidv4 } = require('uuid');

router.post('/', async (req, res) => {
  try {
    const {
      prod_id = uuidv4(),
      title,
      price,
      category,
      description,
      stock = 0,
      reviews = []
    } = req.body;

    if (!title || !price || !category) {
      return res.status(400).json({ message: 'Title, price, and category are required' });
    }

    const product = new Product({
      prod_id,
      title,
      price,
      category,
      description,
      stock,
      reviews
    });

    await product.save();
    res.status(201).json({ message: 'Product created', product });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

