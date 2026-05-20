const { Router } = require('express');
// -------------------------------
const itemTypesController = require('../controllers/itemTypesController');
// -------------------------------
const router = new Router();

router
    .route('/')
    .get(itemTypesController.getAllTypes)
    .post(itemTypesController.createType)
    .put(itemTypesController.updateType);
router
    .route('/:id')
    .get(itemTypesController.getTypeById)
    .delete(itemTypesController.deleteType);

module.exports = router;
