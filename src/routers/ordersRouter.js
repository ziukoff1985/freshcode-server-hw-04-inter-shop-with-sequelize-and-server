const { Router } = require('express');
// -------------------------------
const ordersController = require('../controllers/ordersController');
// -------------------------------
const router = new Router();

router
    .route('/')
    .get(ordersController.getAllOrders)
    .post(ordersController.createOrder)
    .put(ordersController.updateOrder);
router
    .route('/:id')
    .get(ordersController.getOrderById)
    .delete(ordersController.deleteOrder);

module.exports = router;
