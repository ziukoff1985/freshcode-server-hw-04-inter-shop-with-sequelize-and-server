const { Router } = require('express');
// -------------------------------
const brandsController = require('../controllers/brandsController');
const { validateBody } = require('../middleware/index');
const { BRAND_VALIDATION_SCHEMA } = require('../utils/validationSchemas');
// -------------------------------
const router = new Router();

router
    .route('/')
    .get(brandsController.getAllBrands)
    .post(validateBody(BRAND_VALIDATION_SCHEMA), brandsController.createBrand)
    .put(validateBody(BRAND_VALIDATION_SCHEMA), brandsController.updateBrand);
router
    .route('/:id')
    .get(brandsController.getBrandById)
    .delete(brandsController.deleteBrand);

module.exports = router;
