require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const pinoHttp = require('pino-http');
const logger = require('./logger');
const connectToDatabase = require('./models/db');
const giftRoutes = require('./routes/giftRoutes');
const searchRoutes = require('./routes/searchRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(pinoHttp({ logger }));
app.use(express.static('public'));

// Search must be registered before /api/gifts so "search" is not read as :id
app.use('/api/gifts/search', searchRoutes);
// GET /api/search?category=... is served by searchRoutes
app.use('/api/search', searchRoutes);
app.use('/api/gifts', giftRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => res.send('Inside the server'));

app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).send('Internal Server Error');
});

const port = process.env.PORT || 3060;
if (require.main === module) {
  connectToDatabase()
    .then(() => app.listen(port, () => logger.info('Server running on port ' + port)))
    .catch((e) => {
      logger.error(e);
      process.exit(1);
    });
}

module.exports = app;
