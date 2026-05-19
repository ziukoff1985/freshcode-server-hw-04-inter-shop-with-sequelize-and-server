const { Router } = require('express');
// -------------------------------
const itemCategoriesController = require('../controllers/itemCategoriesController');
// -------------------------------
const router = new Router();

router
    .route('/')
    .get(itemCategoriesController.getAllCategories)
    .post(itemCategoriesController.createCategory)
    .put(itemCategoriesController.updateCategory);
router
    .route('/:id')
    .get(itemCategoriesController.getCategoryById)
    .delete(itemCategoriesController.deleteCategory);

module.exports = router;
