const express = require('express');
const router = express.Router();
const { BookStore } = require('../models'); // Import your BookStore model

router.post('/login', async (req, res) => {
  const { admin_user, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await BookStore.findOne({
      where: { admin_user: admin_user, password: password },
      
    });

    if (user) {
      // User exists, you can send a success response or a token for authentication
      res.json({ success: true, message: 'Login successful' });
    } else {
      // User does not exist or incorrect password
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
    console.log(admin_user, password)
  }
});

module.exports = router;