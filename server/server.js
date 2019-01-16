var express = require("express"),
  app = express(),
  bodyParser = require('body-parser'),
  helmet = require('helmet');

var ordersRoute = require('./routes/orders');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', ordersRoute);

const server = app.listen(8080, () => {
    console.log('Server is running..');
});

module.exports = server;
