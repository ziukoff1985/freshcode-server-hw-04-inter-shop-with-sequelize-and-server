const { Router } = require('express');
// -------------------------------
const customersController = require('../controllers/customersController');
const { hashPass } = require('../middleware/index');
// -------------------------------
const router = new Router();

router
    .route('/')
    .get(customersController.getAllCustomers)
    .post(hashPass.hashPassword, customersController.createCustomer)
    .put(hashPass.hashPassword, customersController.updateCustomer);
router
    .route('/:id')
    .get(customersController.getCustomerById)
    .delete(customersController.deleteCustomer);

module.exports = router;
