const express = require('express');
const User = require('../models/user');
const Candidate = require('../models/candidate');

const router = express.Router();

const apiKey = 'your_api_key_here';  // Replace with your actual API key or fetch from environment variables

function authenticateApiKey(req, res, next) {
    const providedApiKey = req.header('x-api-key');
    if (providedApiKey !== apiKey) return res.status(403).send('Forbidden');
    next();
}

router.post('/profile', authenticateApiKey, async (req, res) => {
    const user = await User.findOne({ api_key: apiKey });
    if (!user) return res.status(404).send('User not found');
    res.json({ first_name: user.first_name, last_name: user.last_name, email: user.email });
});

router.get('/candidate', authenticateApiKey, async (req, res) => {
    const user = await User.findOne({ api_key: apiKey });
    if (!user) return res.status(404).send('User not found');

    const candidates = await Candidate.find({ user_id: user._id });
    res.json(candidates);
});

module.exports = router;
