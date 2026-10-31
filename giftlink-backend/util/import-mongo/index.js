require('dotenv').config();
const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

const url = process.env.MONGO_URL || 'mongodb://localhost:27017';

async function loadData() {
  const client = new MongoClient(url);
  try {
    await client.connect();
    const collection = client.db('giftdb').collection('gifts');
    if ((await collection.countDocuments()) === 0) {
      const { docs } = JSON.parse(fs.readFileSync(path.join(__dirname, 'gifts.json'), 'utf8'));
      const r = await collection.insertMany(docs);
      console.log('Inserted ' + r.insertedCount + ' documents');
    } else {
      console.log('Gifts already present');
    }
  } finally {
    await client.close();
  }
}

loadData().catch((e) => {
  console.error(e);
  process.exit(1);
});
