const express = require('express');
const router = express.Router();
const Product = require('../Models/Products');

router.get('/p/:prod_id', async (req, res) => {
  try {
    const { prod_id } = req.params;

    const product = await Product.findOne(
      { prod_id },
      {
        title: 1,
        price: 1,
        description: 1,
        category: 1,
        images: 1,
        reviews: 1
      }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const response = {
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      images: product.images,
      reviews: product.reviews.map(review => ({
        rating: review.rating,
        caption: review.caption,
        images: review.images
      }))
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching product details:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
