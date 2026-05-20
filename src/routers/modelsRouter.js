const { Router } = require('express');
// -------------------------------
const modelsController = require('../controllers/modelsController');
// -------------------------------
const router = new Router();

router
    .route('/')
    .get(modelsController.getAllModels)
    .post(modelsController.createModel)
    .put(modelsController.updateModel);
router
    .route('/:id')
    .get(modelsController.getModelById)
    .delete(modelsController.deleteModel);

module.exports = router;
