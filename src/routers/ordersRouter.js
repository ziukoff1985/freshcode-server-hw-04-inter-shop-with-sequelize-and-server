const { Router } = require('express');
// -------------------------------
const ordersController = require('../controllers/ordersController');
const { validateBody, paginate } = require('../middleware/index');
const {
    ORDER_VALIDATION_SCHEMA,
    BULK_FIND_SCHEMA,
} = require('../utils/validationSchemas');
// -------------------------------
const router = new Router();

router
    .route('/')
    .get(paginate.paginateElements, ordersController.getAllOrders)
    .post(validateBody(ORDER_VALIDATION_SCHEMA), ordersController.createOrder)
    .put(validateBody(ORDER_VALIDATION_SCHEMA), ordersController.updateOrder);

router.route('/half').get(ordersController.getOrdersFromHalf);

router
    .route('/by-customers')
    .post(validateBody(BULK_FIND_SCHEMA), ordersController.getOrdersByCustomer);

router
    .route('/del-by-customers')
    .delete(
        validateBody(BULK_FIND_SCHEMA),
        ordersController.deleteOrdersByCustomer,
    );
router
    .route('/:id')
    .get(ordersController.getOrderById)
    .delete(ordersController.deleteOrder);

module.exports = router;
