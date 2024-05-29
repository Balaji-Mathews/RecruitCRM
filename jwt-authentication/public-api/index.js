const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const publicRoutes = require('./routes/public');

dotenv.config();

const app = express();

app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use('/api/public', publicRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Public API running on port ${PORT}`));
