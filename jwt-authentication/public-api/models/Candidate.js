const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    user_id: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Candidate', candidateSchema);
