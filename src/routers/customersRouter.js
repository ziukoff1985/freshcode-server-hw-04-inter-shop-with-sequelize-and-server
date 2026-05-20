const { Router } = require('express');
// -------------------------------
const customersController = require('../controllers/customersController');
// -------------------------------
const router = new Router();

router
    .route('/')
    .get(customersController.getAllCustomers)
    .post(customersController.createCustomer)
    .put(customersController.updateCustomer);
router
    .route('/:id')
    .get(customersController.getCustomerById)
    .delete(customersController.deleteCustomer);

module.exports = router;
