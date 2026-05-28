const createError = require('http-errors');
const { Op } = require('sequelize');

const { Store } = require('../db/models/index');

class StoresController {
    async getAllStores(req, res, next) {
        try {
            const { limit, offset } = req.pagination;
            const stores = await Store.findAll({
                raw: true,
                limit,
                offset,
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

    async getStoresFromHalf(req, res, next) {
        try {
            // get all ids from table
            const allStores = await Store.findAll({
                attributes: ['id'],
                order: [['id', 'ASC']],
                raw: true,
            });

            if (allStores.length === 0) {
                return next(createError(404, 'Stores not found'));
            }

            // find the index of the middle element of the array and get the actual ID from there.
            const halfIndex = Math.floor(allStores.length / 2);
            const targetId = allStores[halfIndex - 1].id;

            // Select IDs that are greater than the average
            const stores = await Store.findAll({
                where: {
                    id: {
                        [Op.gt]: targetId,
                    },
                },
                order: [['id', 'ASC']],
            });
            console.log(
                `Result from half (id > ${targetId}) is: ${JSON.stringify(stores, null, 2)}`,
            );
            res.status(200).json(stores);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    async getStoresByTitle(req, res, next) {
        try {
            const { values } = req.body;

            if (!values || !Array.isArray(values) || values.length === 0) {
                return next(createError(400, 'Store titles are required'));
            }

            const stores = await Store.findAll({
                where: {
                    title: {
                        [Op.in]: values,
                    },
                },
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

    async deleteStoresByTitles(req, res, next) {
        try {
            const { values } = req.body;

            if (!values || !Array.isArray(values) || values.length === 0) {
                return next(createError(400, 'Store titles are required'));
            }

            const deletedRows = await Store.destroy({
                where: {
                    title: {
                        [Op.in]: values,
                    },
                },
            });

            if (deletedRows === 0) {
                return next(createError(404, 'Stores not found'));
            }

            console.log(`Deleted rows: ${deletedRows}`);
            res.status(200).json({
                message: 'Stores deleted successfully',
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
