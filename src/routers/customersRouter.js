const { Router } = require('express');
// -------------------------------
const customersController = require('../controllers/customersController');
const { hashPass, validateBody } = require('../middleware/index');
const { CUSTOMER_VALIDATION_SCHEMA } = require('../utils/validationSchemas');
// -------------------------------
const router = new Router();

router
    .route('/')
    .get(customersController.getAllCustomers)
    .post(
        validateBody(CUSTOMER_VALIDATION_SCHEMA),
        hashPass.hashPassword,
        customersController.createCustomer,
    )
    .put(
        validateBody(CUSTOMER_VALIDATION_SCHEMA),
        hashPass.hashPassword,
        customersController.updateCustomer,
    );
router
    .route('/:id')
    .get(customersController.getCustomerById)
    .delete(customersController.deleteCustomer);

module.exports = router;
