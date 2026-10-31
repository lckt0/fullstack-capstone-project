const test = require('node:test');
const assert = require('node:assert');
const { analyze } = require('../sentiment');
const gifts = require('./util/import-mongo/gifts.json');

test('seed data has 16 gifts', () => assert.strictEqual(gifts.docs.length, 16));
test('positive sentence is positive', () => assert.strictEqual(analyze('this is a wonderful, great gift').sentiment, 'positive'));
test('negative sentence is negative', () => assert.strictEqual(analyze('this is terrible and awful').sentiment, 'negative'));
