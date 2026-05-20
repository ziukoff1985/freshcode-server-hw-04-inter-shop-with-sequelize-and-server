const { Router } = require('express');
// -------------------------------
const brandsRouter = require('./brandsRouter');
const itemCategoriesRouter = require('./itemCategoriesRouter');
const itemTypesRouter = require('./itemTypesRouter');
// -------------------------------
const router = new Router();

router.use('/brands', brandsRouter);
router.use('/categories', itemCategoriesRouter);
router.use('/types', itemTypesRouter);

module.exports = router;
