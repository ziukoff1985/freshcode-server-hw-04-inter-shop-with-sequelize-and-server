const { Router } = require('express');
// -------------------------------
const storesController = require('../controllers/storesController');
const { validateBody, paginate } = require('../middleware/index');
const {
    STORE_VALIDATION_SCHEMA,
    BULK_FIND_SCHEMA,
} = require('../utils/validationSchemas');
// -------------------------------
const router = new Router();

router
    .route('/')
    .get(paginate.paginateElements, storesController.getAllStores)
    .post(validateBody(STORE_VALIDATION_SCHEMA), storesController.createStore)
    .put(validateBody(STORE_VALIDATION_SCHEMA), storesController.updateStore);

router.route('/half').get(storesController.getStoresFromHalf);

router
    .route('/by-titles')
    .post(validateBody(BULK_FIND_SCHEMA), storesController.getStoresByTitle);

router
    .route('/del-by-titles')
    .delete(
        validateBody(BULK_FIND_SCHEMA),
        storesController.deleteStoresByTitles,
    );
router
    .route('/:id')
    .get(storesController.getStoreById)
    .delete(storesController.deleteStore);

module.exports = router;
