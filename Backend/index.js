const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db/mongooes.js'); 
const addProducts = require('./Routes/AddProducts.js');
const userLogin = require('./Routes/UserLog.js');
const adminLogin = require('./Routes/AdminLogin.js');
const getProducts=require('./Routes/getProductDetails.js')
const addCart=require('./Routes/addCart.js')
const order=require('./Routes/Oders.js')
const AdminOrderUpdate=require('./Routes/AdminOrderUpdate.js')
const getAllProducts=require('./Routes/getAllProducts.js')

require('dotenv').config(); 

const app = express();
const PORT = process.env.PORT || 3000; 

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/add', addProducts);
app.use('/u', userLogin);
app.use('/admin', adminLogin);
app.use('/',getProducts)
app.use('/addcart',addCart)
app.use('/addOrder',order)
app.use('/a',AdminOrderUpdate)
app.use('/products',getAllProducts)
// Server start
app.listen(PORT, () => {
  console.log(`✅ Server started on port ${PORT}`);
});
