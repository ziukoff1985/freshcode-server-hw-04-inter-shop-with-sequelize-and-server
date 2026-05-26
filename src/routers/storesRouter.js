const { Router } = require('express');
// -------------------------------
const storesController = require('../controllers/storesController');
const { validateBody } = require('../middleware/index');
const { STORE_VALIDATION_SCHEMA } = require('../utils/validationSchemas');
// -------------------------------
const router = new Router();

router
    .route('/')
    .get(storesController.getAllStores)
    .post(validateBody(STORE_VALIDATION_SCHEMA), storesController.createStore)
    .put(validateBody(STORE_VALIDATION_SCHEMA), storesController.updateStore);
router
    .route('/:id')
    .get(storesController.getStoreById)
    .delete(storesController.deleteStore);

module.exports = router;
