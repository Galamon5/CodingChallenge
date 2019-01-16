var { validationResult } = require('express-validator/check');

orders = [];
decimals = 2;

exports.generateOrders = (req, res, next) =>{

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  if(orders.length===0 && req.query.genOrders) {
    let numOrdersToGenerate = 1000;

    let randomOrder = (i) => {
      let [initialDate, finalDate] = [new Date(2018,00,01),new Date()]
      let date = new Date(+initialDate + Math.random() * (finalDate - initialDate));
      let status = Math.round(Math.random()) ? "In Process" : "Completed";
      let iva = 0.16;
      let minPrice = 10;
      let maxPrice = 500;
      let subtotal = (Math.random() * maxPrice) + minPrice;
      let taxes = subtotal * iva;
      let total = subtotal + taxes;
      let order = {
        Id: i,
        Date: date,
        Status: status,
        Subtotal: parseFloat(subtotal.toFixed(decimals)),
        Taxes: parseFloat(taxes.toFixed(decimals)),
        Tip: 0,
        Total: parseFloat(total.toFixed(decimals)),
      }
      return order;
    }

    for(let i = 0; i<numOrdersToGenerate; i++)
      orders.push(randomOrder(i));

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
  let ordersPerPage = 10;
  let ordersInPage = orders.slice(num_page*ordersPerPage,(num_page*ordersPerPage)+ordersPerPage);
  let response = {
    size: ordersInPage.length,
    data: ordersInPage,
    page: num_page,
    total_size: orders.length,
    pages: Math.ceil(orders.length/ordersPerPage)
  }
  res.send(response);
}

exports.updateTips = (req, res) =>{

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  let id = parseInt(req.body.id);
  let tip = parseFloat(req.body.tip).toFixed(decimals);
  let order = orders[orders.findIndex((order) => order.Id===id)];
  order.Tip = parseFloat(tip);
  order.Total = parseFloat((order.Subtotal+order.Taxes+order.Tip).toFixed(decimals));
  res.send(order);
}
