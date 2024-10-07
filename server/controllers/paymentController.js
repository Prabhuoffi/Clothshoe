const Payment = require('../models/Payment');

exports.processPayment = async (req, res) => {
  try {
    const { cardNumber, expiry, cvv } = req.body;

    if ( !cardNumber || !expiry || !cvv) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const paymentDetails = { cardNumber, expiry, cvv };

    const newPayment = await Payment.create(paymentDetails);
    res.json(newPayment);
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
