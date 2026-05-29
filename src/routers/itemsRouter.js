const { Router } = require('express');
// -------------------------------
const itemsController = require('../controllers/itemsController');
const { validateBody, paginate } = require('../middleware/index');
const {
    ITEM_VALIDATION_SCHEMA,
    BULK_FIND_SCHEMA,
} = require('../utils/validationSchemas');
// -------------------------------
const router = new Router();

router
    .route('/')
    .get(paginate.paginateElements, itemsController.getAllItems)
    .post(validateBody(ITEM_VALIDATION_SCHEMA), itemsController.createItem)
    .put(validateBody(ITEM_VALIDATION_SCHEMA), itemsController.updateItem);

router.route('/half').get(itemsController.getItemsFromHalf);

router
    .route('/by-brands')
    .post(validateBody(BULK_FIND_SCHEMA), itemsController.getItemsByBrand);

router
    .route('/del-by-brands')
    .delete(
        validateBody(BULK_FIND_SCHEMA),
        itemsController.deleteItemsByBrands,
    );

router
    .route('/:id')
    .get(itemsController.getItemById)
    .delete(itemsController.deleteItem);

module.exports = router;
