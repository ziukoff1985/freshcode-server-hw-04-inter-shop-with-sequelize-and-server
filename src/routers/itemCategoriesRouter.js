const { Router } = require('express');
// -------------------------------
const itemCategoriesController = require('../controllers/itemCategoriesController');
const { validateBody } = require('../middleware/index');
const {
    ITEM_CATEGORY_VALIDATION_SCHEMA,
} = require('../utils/validationSchemas');
// -------------------------------
const router = new Router();

router
    .route('/')
    .get(itemCategoriesController.getAllCategories)
    .post(
        validateBody(ITEM_CATEGORY_VALIDATION_SCHEMA),
        itemCategoriesController.createCategory,
    )
    .put(
        validateBody(ITEM_CATEGORY_VALIDATION_SCHEMA),
        itemCategoriesController.updateCategory,
    );
router
    .route('/:id')
    .get(itemCategoriesController.getCategoryById)
    .delete(itemCategoriesController.deleteCategory);

module.exports = router;
