const express = require('express');
const  profileRoutes = express.Router();
const userModel = require('../model/user.model');
const { authenticateToken } = require('../middleware/authmiddleware');



 profileRoutes.get('/', authenticateToken, async (req, res) => {
  try {
    const user = await userModel.findById(req.user.userId);
  
    if (!user) {
      return res.status(404).json({ message: 'User not found',userId });
    }
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports =  profileRoutes;