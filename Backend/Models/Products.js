const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  rating: { type: Number },
  title: { type: String },
  images: [{ type: String }],
  caption: { type: String }
});

const ProductSchema = new mongoose.Schema(
  {
    prod_id: {
      type: String,
      unique: true,
      required: true
    },
    title: {
      type: String,
      unique: true,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    stock: {
      type: Number,
      default: 0
    },
    images: [{ type: String }], // ✅ Main product images
    reviews: [ReviewSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);
