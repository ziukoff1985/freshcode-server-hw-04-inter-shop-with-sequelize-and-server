const { Router } = require('express');
// -------------------------------
const brandsController = require('../controllers/brandsController');
const { validateBody, paginate, upload } = require('../middleware/index');
const {
    BRAND_VALIDATION_SCHEMA,
    BULK_FIND_SCHEMA,
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
    .post(validateBody(BULK_FIND_SCHEMA), brandsController.getBrandsByTitle);

router
    .route('/del-by-titles')
    .delete(
        validateBody(BULK_FIND_SCHEMA),
        brandsController.deleteBrandsByTitles,
    );

router
    .route('/:id')
    .get(brandsController.getBrandById)
    .delete(brandsController.deleteBrand);

// Router for uploading brand logo
router
    .route('/:brandId/logo')
    .patch(
        upload.uploadImages.single('brandLogo'),
        brandsController.changeLogo,
    );

module.exports = router;
