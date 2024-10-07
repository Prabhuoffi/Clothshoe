const mongoose = require('mongoose');
const encrypt = require('mongoose-encryption');
const crypto = require('crypto');
require('dotenv').config();

const paymentSchema = new mongoose.Schema({
  cardNumber: { type: String, required: true },
  expiry: { type: String, required: true },
  cvv: { type: String, required: true },
});

const encKey = process.env.ENCRYPTION_KEY || crypto.randomBytes(32).toString('base64');
const sigKey = process.env.SIGNING_KEY || crypto.randomBytes(64).toString('base64');

paymentSchema.plugin(encrypt, {
  encryptionKey: Buffer.from(encKey, 'base64'),
  signingKey: Buffer.from(sigKey, 'base64'),
  encryptedFields: ['cardNumber', 'expiry', 'cvv']
});

module.exports = mongoose.model('Payment', paymentSchema);
