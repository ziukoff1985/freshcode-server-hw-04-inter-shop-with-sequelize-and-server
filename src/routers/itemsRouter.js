const { Router } = require('express');
// -------------------------------
const itemsController = require('../controllers/itemsController');
const { validateBody } = require('../middleware/index');
const { ITEM_VALIDATION_SCHEMA } = require('../utils/validationSchemas');
// -------------------------------
const router = new Router();

router
    .route('/')
    .get(itemsController.getAllItems)
    .post(validateBody(ITEM_VALIDATION_SCHEMA), itemsController.createItem)
    .put(validateBody(ITEM_VALIDATION_SCHEMA), itemsController.updateItem);
router
    .route('/:id')
    .get(itemsController.getItemById)
    .delete(itemsController.deleteItem);

module.exports = router;
