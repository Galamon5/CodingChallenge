const express = require("express");
const app = express();
const orders = require('./orders');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/orders', orders);


const server = app.listen(8080, () => {
    console.log('Server is running..');
});
