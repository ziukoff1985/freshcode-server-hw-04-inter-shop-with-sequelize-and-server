const { Router } = require('express');
// -------------------------------
const ordersController = require('../controllers/ordersController');
const { validateBody } = require('../middleware/index');
const { ORDER_VALIDATION_SCHEMA } = require('../utils/validationSchemas');
// -------------------------------
const router = new Router();

router
    .route('/')
    .get(ordersController.getAllOrders)
    .post(validateBody(ORDER_VALIDATION_SCHEMA), ordersController.createOrder)
    .put(validateBody(ORDER_VALIDATION_SCHEMA), ordersController.updateOrder);
router
    .route('/:id')
    .get(ordersController.getOrderById)
    .delete(ordersController.deleteOrder);

module.exports = router;
