// routes/candidate.js

const express = require('express');
const Candidate = require('../models/candidate');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// POST /api/candidate - Add a candidate
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { first_name, last_name, email } = req.body;
        const user_id = req.user.id; // Assuming auth middleware attaches user to req
        const candidate = new Candidate({ first_name, last_name, email, user_id });
        await candidate.save();
        res.status(201).json(candidate);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// GET /api/candidate - Retrieve candidates for the current user
router.get('/', authMiddleware, async (req, res) => {
    try {
        const user_id = req.user.id; // Assuming auth middleware attaches user to req
        const candidates = await Candidate.find({ user_id });
        res.status(200).json(candidates);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
