var express = require("express"),
    { check } = require('express-validator/check');

var ordersCtrl= require('../controllers/orders');
var ordersRoute = express.Router();


ordersRoute.route('/orders')
  .get([
    check('page').optional().isInt(),
    check('genOrders').optional().isBoolean(),
    ordersCtrl.generateOrders,
    ordersCtrl.getOrders,
    ordersCtrl.getPageOrders])
  .patch([
    check('id').isInt({ min: 0 }).withMessage('must be at least 0').custom((value,{ req }) => {
      if(!orders.some((order)=> order.Id==value))
        throw new Error('Id not found');
      else return true;
    }),
    check('tip').isFloat({ min: 0 }).withMessage('must be at least 0').custom((value,{ req }) => {
      let id = parseInt(req.body.id);
      if(orders[orders.findIndex((order) => order.Id===id)].Tip>0)
        throw new Error('This order already has a tip');
      else return true;
    }),
    ordersCtrl.updateTips]);

module.exports = ordersRoute;
