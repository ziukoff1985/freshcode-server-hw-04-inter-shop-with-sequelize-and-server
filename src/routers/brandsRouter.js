const { Router } = require('express');
// -------------------------------
const brandsController = require('../controllers/brandsController');
const { validateBody, paginate } = require('../middleware/index');
const {
    BRAND_VALIDATION_SCHEMA,
    BRAND_TITLES_SCHEMA,
} = require('../utils/validationSchemas');
// -------------------------------
const router = new Router();

router
    .route('/')
    .get(paginate.paginateElements, brandsController.getAllBrands)
    .post(validateBody(BRAND_VALIDATION_SCHEMA), brandsController.createBrand)
    .put(validateBody(BRAND_VALIDATION_SCHEMA), brandsController.updateBrand);

router.route('/half').get(brandsController.getBrandsFromHalf);

router
    .route('/by-titles')
    .post(validateBody(BRAND_TITLES_SCHEMA), brandsController.getBrandsByTitle);

router
    .route('/del-by-titles')
    .delete(
        validateBody(BRAND_TITLES_SCHEMA),
        brandsController.deleteBrandsByTitles,
    );

router
    .route('/:id')
    .get(brandsController.getBrandById)
    .delete(brandsController.deleteBrand);

module.exports = router;
