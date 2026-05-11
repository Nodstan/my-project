const express = require('express');
const router = express.Router();
const VerificationCode = require('../models/VerificationCode');
const User = require('../models/User');
const nodemailer = require('nodemailer');

router.post('/send-code', async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    await VerificationCode.deleteMany({ userId: user._id });

    const code = Math.floor(1000 + Math.random() * 9000).toString();

    const verification = new VerificationCode({
      userId: user._id,
      code,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });
    await verification.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your verification code',
      text: `Your MedTales verification code is ${code}`,
    });

    res.json({ message: 'Code sent successfully' });
  } catch (err) {
    console.error('Send-code error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/verify-code', async (req, res) => {
  try {
    const { email, code } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const verification = await VerificationCode.findOne({ userId: user._id })
      .sort({ createdAt: -1 });

    if (!verification) {
      return res.status(400).json({ message: 'No code found. Please request a new one.' });
    }

    if (new Date(verification.expiresAt) < new Date()) {
      return res.status(400).json({ message: 'Code expired. Please request a new one.' });
    }

    if (verification.code !== code) {
      return res.status(400).json({ message: 'Invalid code' });
    }

    await VerificationCode.deleteMany({ userId: user._id });

    res.json({ message: 'Code verified successfully' });

  } catch (err) {
    console.error('Verify-code error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
