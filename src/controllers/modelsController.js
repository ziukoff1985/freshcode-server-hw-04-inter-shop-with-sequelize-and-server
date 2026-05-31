const createError = require('http-errors');
const { Op } = require('sequelize');

const { Model, Brand } = require('../db/models/index');

class ModelsController {
    async getAllModels(req, res, next) {
        try {
            const { limit, offset } = req.pagination;
            const models = await Model.findAll({
                attributes: ['id', 'title', 'description'],
                include: [{ model: Brand, attributes: ['title'] }],
                limit,
                offset,
                order: [['id', 'ASC']],
            });
            if (models.length === 0) {
                return next(createError(404, 'Models not found'));
            }
            console.log(`Result is: ${JSON.stringify(models, null, 2)}`);
            res.status(200).json(models);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    async getModelById(req, res, next) {
        try {
            const { id } = req.params;
            const model = await Model.findOne({
                where: { id },
                attributes: ['id', 'title', 'description'],
                include: [{ model: Brand, attributes: ['title'] }],
            });
            if (!model) {
                return next(createError(404, 'Model not found'));
            }
            console.log(`Result is: ${JSON.stringify(model, null, 2)}`);
            res.status(200).json(model);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    async getModelsFromHalf(req, res, next) {
        try {
            // get all ids from table
            const allModels = await Model.findAll({
                attributes: ['id'],
                order: [['id', 'ASC']],
                raw: true,
            });

            if (allModels.length === 0) {
                return next(createError(404, 'Models not found'));
            }

            // find the index of the middle element of the array and get the actual ID from there.
            const halfIndex = Math.floor(allModels.length / 2);
            const targetId =
                halfIndex > 0 ? allModels[halfIndex - 1].id : allModels[0].id;

            // Select IDs that are greater than the average
            const models = await Model.findAll({
                attributes: ['id', 'title', 'description'],
                include: [{ model: Brand, attributes: ['title'] }],
                where: {
                    id: {
                        [Op.gt]: targetId,
                    },
                },
                order: [['id', 'ASC']],
            });

            console.log(
                `Result from half (id > ${targetId}) is: ${JSON.stringify(models, null, 2)}`,
            );
            res.status(200).json(models);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    async getModelsByTitle(req, res, next) {
        try {
            const { values } = req.body;

            if (!values || !Array.isArray(values) || values.length === 0) {
                return next(createError(400, 'Brand titles are required'));
            }

            const models = await Model.findAll({
                attributes: ['id', 'title', 'description'],
                include: [{ model: Brand, attributes: ['title'] }],
                where: {
                    title: {
                        [Op.in]: values,
                    },
                },
                order: [['id', 'ASC']],
            });
            if (models.length === 0) {
                return next(createError(404, 'Models not found'));
            }
            console.log(`Result is: ${JSON.stringify(models, null, 2)}`);
            res.status(200).json(models);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    async createModel(req, res, next) {
        try {
            const { title, description, brandTitle } = req.body;
            const brand = await Brand.findOne({ where: { title: brandTitle } });
            if (!brand) {
                return next(createError(404, 'Brand not found'));
            }
            const model = await Model.create({
                title,
                description,
                brandId: brand.id,
            });
            console.log(`Result is: ${JSON.stringify(model, null, 2)}`);
            res.status(201).json(model);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    async deleteModel(req, res, next) {
        try {
            const { id } = req.params;
            const deletedRows = await Model.destroy({ where: { id } });
            if (deletedRows === 0) {
                return next(createError(404, 'Model not found'));
            }
            console.log(`Deleted rows: ${deletedRows}`);
            res.status(200).json({
                message: 'Model deleted successfully',
            });
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    async deleteModelsByTitles(req, res, next) {
        try {
            const { values } = req.body;

            if (!values || !Array.isArray(values) || values.length === 0) {
                return next(createError(400, 'Model titles are required'));
            }

            const deletedRows = await Model.destroy({
                where: {
                    title: {
                        [Op.in]: values,
                    },
                },
            });

            if (deletedRows === 0) {
                return next(createError(404, 'Models not found'));
            }

            console.log(`Deleted rows: ${deletedRows}`);
            res.status(200).json({
                message: 'Models deleted successfully',
            });
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    async updateModel(req, res, next) {
        try {
            const { id, brandTitle, ...restUpdatedData } = req.body;
            const brand = await Brand.findOne({ where: { title: brandTitle } });
            if (!brand) {
                return next(createError(404, 'Brand not found'));
            }
            const model = await Model.findOne({ where: { id } });
            if (!model) {
                return next(createError(404, 'Model not found'));
            }
            await model.update({
                ...restUpdatedData,
                brandId: brand.id,
            });
            console.log(`Result is: ${JSON.stringify(model, null, 2)}`);
            res.status(200).json(model);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }
}

module.exports = new ModelsController();
