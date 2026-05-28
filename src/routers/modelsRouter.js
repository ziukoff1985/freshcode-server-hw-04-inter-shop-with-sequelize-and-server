const { Router } = require('express');
// -------------------------------
const modelsController = require('../controllers/modelsController');
const { validateBody, paginate } = require('../middleware/index');
const {
    MODEL_VALIDATION_SCHEMA,
    BULK_FIND_SCHEMA,
} = require('../utils/validationSchemas');
// -------------------------------
const router = new Router();

router
    .route('/')
    .get(paginate.paginateElements, modelsController.getAllModels)
    .post(validateBody(MODEL_VALIDATION_SCHEMA), modelsController.createModel)
    .put(validateBody(MODEL_VALIDATION_SCHEMA), modelsController.updateModel);

router.route('/half').get(modelsController.getModelsFromHalf);

router
    .route('/by-titles')
    .post(validateBody(BULK_FIND_SCHEMA), modelsController.getModelsByTitle);

router
    .route('/del-by-titles')
    .delete(
        validateBody(BULK_FIND_SCHEMA),
        modelsController.deleteModelsByTitles,
    );
router
    .route('/:id')
    .get(modelsController.getModelById)
    .delete(modelsController.deleteModel);

module.exports = router;
