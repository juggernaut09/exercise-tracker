const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});



const app = express();

const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

app.listen(port, () => {
    const exercisesRouter = require('./routes/exercises');
    const usersRouter = require('./routes/users');
    app.use('/exercises', exercisesRouter);
    app.use('/users', usersRouter);
    console.log(`The server has been started at ${port}`);
});