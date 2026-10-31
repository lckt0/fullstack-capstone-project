const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connectToDatabase = require('../models/db');
const logger = require('../logger');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'dev-only-secret';

router.post('/register', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('users');
    const existing = await collection.findOne({ email: req.body.email });
    if (existing) return res.status(400).json({ error: 'Email already registered' });
    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(req.body.password, salt);
    await collection.insertOne({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: hash,
      createdAt: new Date(),
    });
    const authtoken = jwt.sign({ user: { id: req.body.email } }, JWT_SECRET);
    res.json({ authtoken, email: req.body.email });
  } catch (e) {
    logger.error(e);
    res.status(500).send('Internal server error');
  }
});

router.post('/login', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('users');
    const theUser = await collection.findOne({ email: req.body.email });
    if (!theUser) return res.status(404).json({ error: 'User not found' });
    const match = await bcryptjs.compare(req.body.password, theUser.password);
    if (!match) return res.status(401).json({ error: 'Wrong password' });
    const authtoken = jwt.sign({ user: { id: theUser._id.toString() } }, JWT_SECRET);
    res.json({ authtoken, userName: theUser.firstName, userEmail: theUser.email });
  } catch (e) {
    logger.error(e);
    res.status(500).send('Internal server error');
  }
});

// PUT /api/auth/update - update the first/last name of the logged-in user
router.put('/update', async (req, res) => {
  try {
    const email = req.headers.email;
    if (!email) return res.status(400).json({ error: 'Email not found in the request headers' });
    const header = req.headers.authorization || '';
    try {
      jwt.verify(header.replace('Bearer ', ''), JWT_SECRET);
    } catch (e) {
      return res.status(401).json({ error: 'Invalid or missing token' });
    }
    const db = await connectToDatabase();
    const collection = db.collection('users');
    const existingUser = await collection.findOne({ email });
    if (!existingUser) return res.status(404).json({ error: 'User not found' });
    const updated = await collection.findOneAndUpdate(
      { email },
      { $set: { firstName: req.body.name, updatedAt: new Date() } },
      { returnDocument: 'after' }
    );
    const authtoken = jwt.sign({ user: { id: updated._id.toString() } }, JWT_SECRET);
    res.json({ authtoken });
  } catch (e) {
    logger.error(e);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
