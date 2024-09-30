const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const subscriptionRoutes = require('./routes/subscription');
const newsRoutes = require('./routes/news');

app.use('/api/news', newsRoutes);
app.use('/api/subscription', subscriptionRoutes.router);

mongoose.connect('mongodb+srv://avinashselvi214:avinash@newsappcluster0.8vvss.mongodb.net/?retryWrites=true&w=majority&appName=newsappCluster0', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => console.error(err));
