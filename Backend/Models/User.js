const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  zipCode: String,
  country: String
});

const UserOrderSummarySchema = new mongoose.Schema({
  orderId: { type: String }, // ✅ Store the orderId from Order schema
  products: [
    {
      prod_id: String,
      title: String,
      quantity: Number,
      price: Number,
      subtotal: Number
    }
  ],
  totalAmount: Number,
  paymentMethod: String,
  paymentStatus: String,
  orderStatus: String,
  shippingAddress: AddressSchema,
  orderDate: Date,
  deliveryDate: Date
});

const CartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: Number,
  addedAt: { type: Date, default: Date.now }
});

const LoginSessionSchema = new mongoose.Schema({
  loginTime: { type: Date, default: Date.now },
  ip: String,
  location: {
    city: String,
    region: String,
    country: String,
    latitude: Number,
    longitude: Number
  }
});

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: String,
    address: [AddressSchema],
    cart: [CartItemSchema],
    loginHistory: [LoginSessionSchema],
    orders: [UserOrderSummarySchema] // ✅ Contains orderId
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
