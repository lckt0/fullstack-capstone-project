const express = require('express');
const natural = require('natural');

const analyzer = new natural.SentimentAnalyzer('English', natural.PorterStemmer, 'afinn');
const tokenizer = new natural.WordTokenizer();

function analyze(sentence) {
  const score = analyzer.getSentiment(tokenizer.tokenize(sentence));
  let sentiment = 'neutral';
  if (score < 0) sentiment = 'negative';
  else if (score > 0.33) sentiment = 'positive';
  return { score, sentiment };
}

const app = express();
app.use(express.json());

// POST /sentiment  { "sentence": "..." }
app.post('/sentiment', (req, res) => {
  const { sentence } = req.body || {};
  if (!sentence) return res.status(400).json({ error: 'No sentence provided' });
  const result = analyze(sentence);
  res.json({ sentimentScore: result.score, sentiment: result.sentiment });
});

if (require.main === module) {
  const port = process.env.PORT || 3070;
  app.listen(port, () => console.log('Sentiment service on port ' + port));
}

module.exports = app;
module.exports.analyze = analyze;
