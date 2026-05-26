const { Router } = require('express');
// -------------------------------
const itemTypesController = require('../controllers/itemTypesController');
const { validateBody } = require('../middleware/index');
const { ITEM_TYPE_VALIDATION_SCHEMA } = require('../utils/validationSchemas');
// -------------------------------
const router = new Router();

router
    .route('/')
    .get(itemTypesController.getAllTypes)
    .post(
        validateBody(ITEM_TYPE_VALIDATION_SCHEMA),
        itemTypesController.createType,
    )
    .put(
        validateBody(ITEM_TYPE_VALIDATION_SCHEMA),
        itemTypesController.updateType,
    );
router
    .route('/:id')
    .get(itemTypesController.getTypeById)
    .delete(itemTypesController.deleteType);

module.exports = router;
