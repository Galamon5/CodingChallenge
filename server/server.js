const express = require("express");
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var orders = [];

app.get('/orders', (req, res, next) => {
  if(req.query.page) {
   next();
   return;
  }
  let response = {
    size: orders.slice(0,5).length,
    data: orders.slice(0,5),
    page: 0,
    total_size: orders.length,
    pages: Math.ceil(orders.length/5)
  }
  res.send(response);
});

app.get('/orders', (req, res) => {
  let num_page = parseInt(req.query.page);
  let response = {
    size: orders.slice(num_page*5,(num_page*5)+5).length,
    data: orders.slice(num_page*5,(num_page*5)+5),
    page: num_page,
    total_size: orders.length,
    pages: Math.ceil(orders.length/5)
  }
  res.send(response);
});

app.patch('/orders',(req, res) => {
  let id = parseInt(req.body.id);
  let tip = parseInt(req.body.tip);
  if(orders.some((order)=> order.Id===id)){
    res.send(orders[orders.findIndex((order) => order.Id===id)]);
  }else{
    res.send('hola');
  }


});

var server = app.listen(8080, function () {
    console.log('Server is running..');
    console.log('Genereting random orders...');
    let randomOrders = (i) => {
      let [initialDate, finalDate] = [new Date(2018,00,01),new Date()]
      let date = new Date(+initialDate + Math.random() * (finalDate - initialDate));
      let status = Math.round(Math.random()) ? "In Process" : "Completed";
      let subtotal = (Math.random() * 200) + 10;
      let taxes = subtotal * 0.16;
      let total = subtotal + taxes;
      let order = {
        Id: i,
        Date: date,
        Status: status,
        Subtotal: parseFloat(subtotal.toFixed(2)),
        Taxes: parseFloat(taxes.toFixed(2)),
        tip: 0,
        Total: parseFloat(total.toFixed(2)),
      }
      return order;
    }
    for(let i = 0; i<=100; i++)
      orders.push(randomOrders(i));
});
