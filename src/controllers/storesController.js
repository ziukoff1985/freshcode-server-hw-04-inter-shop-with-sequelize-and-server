const createError = require('http-errors');

const { Store } = require('../db/models/index');

class StoresController {
    async getAllStores(req, res, next) {
        try {
            const stores = await Store.findAll({
                limit: 10,
                order: [['id', 'ASC']],
            });
            if (stores.length === 0) {
                return next(createError(404, 'Stores not found'));
            }
            console.log(`Result is: ${JSON.stringify(stores, null, 2)}`);
            res.status(200).json(stores);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    async getStoreById(req, res, next) {
        try {
            const { id } = req.params;
            const store = await Store.findByPk(id);
            if (!store) {
                return next(createError(404, 'Store not found'));
            }
            console.log(`Result is: ${JSON.stringify(store, null, 2)}`);
            res.status(200).json(store);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    async createStore(req, res, next) {
        try {
            const { title, description } = req.body;
            const store = await Store.create({ title, description });
            console.log(`Result is: ${JSON.stringify(store, null, 2)}`);
            res.status(201).json(store);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    async deleteStore(req, res, next) {
        try {
            const { id } = req.params;
            const deletedRows = await Store.destroy({ where: { id } });
            if (deletedRows === 0) {
                return next(createError(404, 'Store not found'));
            }
            console.log(`Deleted rows: ${deletedRows}`);
            res.status(200).json({
                message: 'Store deleted successfully',
            });
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    async updateStore(req, res, next) {
        try {
            const { id, title, description } = req.body;
            const store = await Store.findByPk(id);
            if (!store) {
                return next(createError(404, 'Store not found'));
            }
            await store.update({ title, description });
            console.log(`Result is: ${JSON.stringify(store, null, 2)}`);
            res.status(200).json(store);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }
}

module.exports = new StoresController();
