const mongoose = require('mongoose');

// Login session schema
const LoginSessionSchema = new mongoose.Schema({
  loginTime: { type: Date, default: Date.now },
  ip: { type: String },
  location: {
    city: { type: String },
    region: { type: String },
    country: { type: String },
    latitude: { type: Number },
    longitude: { type: Number }
  }
});

const AdminSchema = new mongoose.Schema({
  user_id: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  pass: {
    type: String
  },
  updates: [
    {
      user: { type: String },
      prod_id: { type: String },
      change: { type: String },
      details: { type: String },
      date: { type: Date, default: Date.now }
    }
  ],
  loginHistory: [LoginSessionSchema]
});

module.exports = mongoose.model('Admin', AdminSchema);
