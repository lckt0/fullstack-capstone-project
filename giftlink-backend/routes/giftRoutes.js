const express = require('express');
const connectToDatabase = require('../models/db');
const logger = require('../logger');

const router = express.Router();

// GET /api/gifts - list all gifts (database via connectToDatabase())
router.get('/', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('gifts');
    const gifts = await collection.find({}).toArray();
    res.json(gifts);
  } catch (e) {
    logger.error(e);
    res.status(500).send('Error fetching gifts');
  }
});

// GET /api/gifts/:id - one gift by id (database via connectToDatabase())
router.get('/:id', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('gifts');
    const gift = await collection.findOne({ id: req.params.id });
    if (!gift) return res.status(404).send('Gift not found');
    res.json(gift);
  } catch (e) {
    logger.error(e);
    res.status(500).send('Error fetching gift');
  }
});

module.exports = router;
