const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../Models/Admin'); 

const JWT_SECRET = 'your_jwt_secret_here';


router.post('/', async (req, res) => {
  const { email, password, ip, location } = req.body;

  try {

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    const isMatch = await bcrypt.compare(password, admin.pass);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: '1d' });

    const loginSession = {
      loginTime: new Date(),
      ip: ip || req.ip,
      location: location || {}
    };
    admin.loginHistory.push(loginSession);
    await admin.save();

    res.status(200).json({
      message: 'Login successful',
      token,
      admin: {
        id: admin._id,
        email: admin.email
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
