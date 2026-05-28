const { Router } = require('express');
// -------------------------------
const itemTypesController = require('../controllers/itemTypesController');
const { validateBody, paginate } = require('../middleware/index');
const {
    ITEM_TYPE_VALIDATION_SCHEMA,
    BULK_FIND_SCHEMA,
} = require('../utils/validationSchemas');
// -------------------------------
const router = new Router();

router
    .route('/')
    .get(paginate.paginateElements, itemTypesController.getAllTypes)
    .post(
        validateBody(ITEM_TYPE_VALIDATION_SCHEMA),
        itemTypesController.createType,
    )
    .put(
        validateBody(ITEM_TYPE_VALIDATION_SCHEMA),
        itemTypesController.updateType,
    );

router.route('/half').get(itemTypesController.getTypesFromHalf);

router
    .route('/by-titles')
    .post(validateBody(BULK_FIND_SCHEMA), itemTypesController.getTypesByTitle);

router
    .route('/del-by-titles')
    .delete(
        validateBody(BULK_FIND_SCHEMA),
        itemTypesController.deleteTypesByTitles,
    );

router
    .route('/:id')
    .get(itemTypesController.getTypeById)
    .delete(itemTypesController.deleteType);

module.exports = router;
