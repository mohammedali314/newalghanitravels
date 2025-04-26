const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Register Admin/Agent
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, companyName, contactNumber, role = 'agent' } = req.body;

    // Check if user already exists
    let user = await Admin.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    user = new Admin({
      username,
      email,
      password,
      role,
      companyName,
      contactNumber,
      status: role === 'admin' ? 'approved' : 'pending'
    });

    await user.save();

    // Create token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(201).json({
      token,
      admin: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        status: user.status,
        companyName: user.companyName,
        contactNumber: user.contactNumber
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await Admin.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if agent is approved
    if (user.role === 'agent' && user.status !== 'approved') {
      return res.status(403).json({ 
        message: 'Your account is pending approval',
        status: user.status
      });
    }

    // Create token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      token,
      admin: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        status: user.status,
        companyName: user.companyName,
        contactNumber: user.contactNumber
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all agents
router.get('/agents', async (req, res) => {
  try {
    const agents = await Admin.find({ role: 'agent' }).select('-password');
    res.json(agents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update agent status
router.put('/agents/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const agent = await Admin.findById(req.params.id);

    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }

    if (agent.role !== 'agent') {
      return res.status(400).json({ message: 'User is not an agent' });
    }

    agent.status = status;
    await agent.save();

    res.json(agent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 