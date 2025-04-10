const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // Install with: npm install uuid

const AddressSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  zipCode: String,
  country: String
});

const OrderedProductSchema = new mongoose.Schema({
  prod_id: { type: String, required: true },
  title: String,
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  subtotal: Number
});

const OrderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      unique: true,
      default: () => 'ORD-' + uuidv4().split('-')[0].toUpperCase()
    },
    email: { type: String, required: true },
    phone_no: { type: String, required: true },
    products: [OrderedProductSchema],

    paymentMethod: {
      type: String,
      enum: ['Card', 'UPI', 'COD', 'PayPal'],
      required: true
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Completed', 'Failed'],
      default: 'Pending'
    },
    orderStatus: {
      type: String,
      enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Processing'
    },

    totalAmount: { type: Number, required: true },
    billingAddress: AddressSchema,
    shippingAddress: AddressSchema,
    orderDate: { type: Date, default: Date.now },
    deliveryDate: { type: Date }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);
