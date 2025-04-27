const express = require('express');
const { 
  User, 
  Product, 
  Cart, 
  Order, 
  ContactSubmission,
  connectToDatabase 
} = require('./models');

const app = express();

// Connect to Database
connectToDatabase();

// Example Routes
app.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    const submission = new ContactSubmission({ 
      name, 
      email, 
      phone, 
      message 
    });
    await submission.save();
    res.status(201).json({ message: 'Submission received' });
  } catch (error) {
    res.status(500).json({ error: 'Submission failed' });
  }
});

app.post('/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});