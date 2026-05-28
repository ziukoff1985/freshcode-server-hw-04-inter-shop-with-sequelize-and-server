const { Router } = require('express');
// -------------------------------
const itemCategoriesController = require('../controllers/itemCategoriesController');
const { validateBody, paginate } = require('../middleware/index');
const {
    ITEM_CATEGORY_VALIDATION_SCHEMA,
    BULK_FIND_SCHEMA,
} = require('../utils/validationSchemas');
// -------------------------------
const router = new Router();

router
    .route('/')
    .get(paginate.paginateElements, itemCategoriesController.getAllCategories)
    .post(
        validateBody(ITEM_CATEGORY_VALIDATION_SCHEMA),
        itemCategoriesController.createCategory,
    )
    .put(
        validateBody(ITEM_CATEGORY_VALIDATION_SCHEMA),
        itemCategoriesController.updateCategory,
    );

router.route('/half').get(itemCategoriesController.getCategoriesFromHalf);

router
    .route('/by-titles')
    .post(
        validateBody(BULK_FIND_SCHEMA),
        itemCategoriesController.getCategoriesByTitle,
    );

router
    .route('/del-by-titles')
    .delete(
        validateBody(BULK_FIND_SCHEMA),
        itemCategoriesController.deleteCategoriesByTitles,
    );
router
    .route('/:id')
    .get(itemCategoriesController.getCategoryById)
    .delete(itemCategoriesController.deleteCategory);

module.exports = router;
