
var { validationResult } = require('express-validator/check');
var orders = [];

exports.generateOrders = (req, res, next) =>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  if(orders.length===0 && req.query.genOrders) {
    console.log('Genereting random orders...');
    let randomOrder = (i) => {
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
        Tip: 0,
        Total: parseFloat(total.toFixed(2)),
      }
      return order;
    }
    for(let i = 0; i<50; i++)
      orders.push(randomOrder(i));
    console.log('Orders Generated');
    next();
  } else
    next();
}

exports.getOrders = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  if(req.query.page) {
   next();
   return;
  }
  let response = {
    size: orders.slice(0,10).length,
    data: orders.slice(0,10),
    page: 0,
    total_size: orders.length,
    pages: Math.ceil(orders.length/10)
  }
  res.send(response);
}

exports.getPageOrders = (req, res) =>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  let num_page = parseInt(req.query.page);
  let response = {
    size: orders.slice(num_page*10,(num_page*10)+10).length,
    data: orders.slice(num_page*10,(num_page*10)+10),
    page: num_page,
    total_size: orders.length,
    pages: Math.ceil(orders.length/10)
  }
  res.send(response);
}

exports.updateTips = (req, res) =>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  let id = parseInt(req.body.id);
  let tip = parseFloat(req.body.tip).toFixed(2);
  tip = parseFloat(tip);
  orders[orders.findIndex((order) => order.Id===id)].Tip = tip;
  orders[orders.findIndex((order) => order.Id===id)].Total += tip;
  orders[orders.findIndex((order) => order.Id===id)].Total = parseFloat(orders[orders.findIndex((order) => order.Id===id)].Total.toFixed(2));
  res.send(orders[orders.findIndex((order) => order.Id===id)]);
}
