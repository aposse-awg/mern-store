const express = require('express');
const productRoutes = require('./routes/product');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const path = require('path');

// Serve uploaded files in storage/ as static assets
app.use('/storage', express.static(path.join(__dirname, 'storage')));

app.use('/v1', productRoutes)


module.exports = app;