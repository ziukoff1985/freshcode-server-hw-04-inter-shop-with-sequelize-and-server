const { Router } = require('express');
// -------------------------------
const brandsController = require('../controllers/brandsController');
// -------------------------------
const router = new Router();

router
    .route('/')
    .get(brandsController.getAllBrands)
    .post(brandsController.createBrand)
    .put(brandsController.updateBrand);
router
    .route('/:id')
    .get(brandsController.getBrandById)
    .delete(brandsController.deleteBrand);

module.exports = router;
