const { Router } = require('express');
// -------------------------------
const itemsController = require('../controllers/itemsController');
// -------------------------------
const router = new Router();

router
    .route('/')
    .get(itemsController.getAllItems)
    .post(itemsController.createItem)
    .put(itemsController.updateItem);
router
    .route('/:id')
    .get(itemsController.getItemById)
    .delete(itemsController.deleteItem);

module.exports = router;
