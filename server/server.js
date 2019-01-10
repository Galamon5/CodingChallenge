const express = require("express");
const app = express();
const orders = require('./orders');
const helmet = require('helmet');

app.use(helmet());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/orders', orders);

const server = app.listen(8080, () => {
    console.log('Server is running..');
});

module.exports = server;
