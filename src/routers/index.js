const { Router } = require('express');
// -------------------------------
const brandsRouter = require('./brandsRouter');
const itemCategoriesController = require('./itemCategoriesRouter');
// -------------------------------
const router = new Router();

router.use('/brands', brandsRouter);
router.use('/categories', itemCategoriesController);

module.exports = router;
