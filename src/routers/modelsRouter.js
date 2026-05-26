const { Router } = require('express');
// -------------------------------
const modelsController = require('../controllers/modelsController');
const { validateBody } = require('../middleware/index');
const { MODEL_VALIDATION_SCHEMA } = require('../utils/validationSchemas');
// -------------------------------
const router = new Router();

router
    .route('/')
    .get(modelsController.getAllModels)
    .post(validateBody(MODEL_VALIDATION_SCHEMA), modelsController.createModel)
    .put(validateBody(MODEL_VALIDATION_SCHEMA), modelsController.updateModel);
router
    .route('/:id')
    .get(modelsController.getModelById)
    .delete(modelsController.deleteModel);

module.exports = router;
