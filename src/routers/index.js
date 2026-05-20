const { Router } = require('express');
// -------------------------------
const brandsRouter = require('./brandsRouter');
const itemCategoriesRouter = require('./itemCategoriesRouter');
const itemTypesRouter = require('./itemTypesRouter');
const storesRouter = require('./storesRouter');
const customersRouter = require('./customersRouter');
// -------------------------------
const router = new Router();

router.use('/brands', brandsRouter);
router.use('/categories', itemCategoriesRouter);
router.use('/types', itemTypesRouter);
router.use('/stores', storesRouter);
router.use('/customers', customersRouter);

module.exports = router;
