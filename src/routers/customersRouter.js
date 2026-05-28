const { Router } = require('express');
// -------------------------------
const customersController = require('../controllers/customersController');
const { hashPass, validateBody, paginate } = require('../middleware/index');
const {
    CUSTOMER_VALIDATION_SCHEMA,
    BULK_FIND_SCHEMA,
} = require('../utils/validationSchemas');
// -------------------------------
const router = new Router();

router
    .route('/')
    .get(paginate.paginateElements, customersController.getAllCustomers)
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

router.route('/half').get(customersController.getCustomersFromHalf);

router
    .route('/by-names')
    .post(
        validateBody(BULK_FIND_SCHEMA),
        customersController.getCustomersByNames,
    );

router
    .route('/del-by-names')
    .delete(
        validateBody(BULK_FIND_SCHEMA),
        customersController.deleteCustomersByNames,
    );

router
    .route('/:id')
    .get(customersController.getCustomerById)
    .delete(customersController.deleteCustomer);

module.exports = router;
