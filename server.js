
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const connectDB = require('./config/db');

const dotenv = require("dotenv");
dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
  });
connectDB();
const adminRoutes = require('./routes/calculation.routes');
app.use('/api', adminRoutes);

if (process.env.NODE_ENV === 'production') {

  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log(`Server is starting at ${PORT}`));




