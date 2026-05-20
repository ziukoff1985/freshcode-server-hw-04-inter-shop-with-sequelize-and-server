const createError = require('http-errors');

const { Model, Brand } = require('../db/models/index');

class ModelsController {
    async getAllModels(req, res, next) {
        try {
            const models = await Model.findAll({
                limit: 10,
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
            const model = await Model.findByPk(id);
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
