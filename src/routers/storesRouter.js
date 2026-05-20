const { Router } = require('express');
// -------------------------------
const storesController = require('../controllers/storesController');
// -------------------------------
const router = new Router();

router
    .route('/')
    .get(storesController.getAllStores)
    .post(storesController.createStore)
    .put(storesController.updateStore);
router
    .route('/:id')
    .get(storesController.getStoreById)
    .delete(storesController.deleteStore);

module.exports = router;
