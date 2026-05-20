const { Router } = require('express');
// -------------------------------
const brandsRouter = require('./brandsRouter');
const itemCategoriesRouter = require('./itemCategoriesRouter');
const itemTypesRouter = require('./itemTypesRouter');
const storesRouter = require('./storesRouter');
// -------------------------------
const router = new Router();

router.use('/brands', brandsRouter);
router.use('/categories', itemCategoriesRouter);
router.use('/types', itemTypesRouter);
router.use('/stores', storesRouter);

module.exports = router;
