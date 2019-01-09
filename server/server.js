const express = require("express");
const app = express();
const orders = require('./orders');

app.use('/orders', orders);

const server = app.listen(8080, () => {
    console.log('Server is running..');
});
