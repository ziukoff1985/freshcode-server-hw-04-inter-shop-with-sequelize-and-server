const createError = require('http-errors');

const { ItemType } = require('../db/models/index');

class ItemTypesController {
    async getAllTypes(req, res, next) {
        try {
            const types = await ItemType.findAll({
                limit: 10,
                order: [['id', 'ASC']],
            });
            if (types.length === 0) {
                next(createError(404, 'Types not found'));
            }
            console.log(`Result is: ${JSON.stringify(types, null, 2)}`);
            res.status(200).json(types);
        } catch (error) {
            console.log(error.message);
            next(error.message);
        }
    }

    async getTypeById(req, res, next) {
        try {
            const { id } = req.params;
            const type = await ItemType.findByPk(id);
            if (!type) {
                next(createError(404, 'Type not found'));
            }
            console.log(`Result is: ${JSON.stringify(type, null, 2)}`);
            res.status(200).json(type);
        } catch (error) {
            console.log(error.message);
            next(error.message);
        }
    }

    async createType(req, res, next) {
        try {
            const { title, description } = req.body;
            const type = await ItemType.create({ title, description });
            console.log(`Result is: ${JSON.stringify(type, null, 2)}`);
            res.status(201).json(type);
        } catch (error) {
            console.log(error.message);
            next(error.message);
        }
    }

    async deleteType(req, res, next) {
        try {
            const { id } = req.params;
            const type = await ItemType.destroy({ where: { id } });
            if (type === 0) {
                next(createError(404, 'Type not found'));
            }
            console.log(`Result is: ${type}`);
            res.status(200).json(type);
        } catch (error) {
            console.log(error.message);
            next(error.message);
        }
    }

    async updateType(req, res, next) {
        try {
            const { id, title, description } = req.body;
            const type = await ItemType.findOne({ where: { id } });
            if (!type) {
                next(createError(404, 'Type not found'));
            }
            await type.update({ title, description });
            console.log(`Result is: ${JSON.stringify(type, null, 2)}`);
            res.status(200).json(type);
        } catch (error) {
            console.log(error.message);
            next(error.message);
        }
    }
}

module.exports = new ItemTypesController();
