const createError = require('http-errors');
const { Op } = require('sequelize');

const { ItemType } = require('../db/models/index');

class ItemTypesController {
    async getAllTypes(req, res, next) {
        try {
            const { limit, offset } = req.pagination;
            const types = await ItemType.findAll({
                raw: true,
                limit,
                offset,
                order: [['id', 'ASC']],
            });
            if (types.length === 0) {
                return next(createError(404, 'Types not found'));
            }
            console.log(`Result is: ${JSON.stringify(types, null, 2)}`);
            res.status(200).json(types);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    async getTypeById(req, res, next) {
        try {
            const { id } = req.params;
            const type = await ItemType.findByPk(id, {
                raw: true,
            });
            if (!type) {
                return next(createError(404, 'Type not found'));
            }
            console.log(`Result is: ${JSON.stringify(type, null, 2)}`);
            res.status(200).json(type);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    async getTypesFromHalf(req, res, next) {
        try {
            // get all ids from table
            const allTypes = await ItemType.findAll({
                attributes: ['id'],
                order: [['id', 'ASC']],
                raw: true,
            });
            if (allTypes.length === 0) {
                return next(createError(404, 'Types not found'));
            }
            // find the index of the middle element of the array and get the actual ID from there.
            const halfIndex = Math.floor(allTypes.length / 2);
            const targetId =
                halfIndex > 0 ? allTypes[halfIndex - 1].id : allTypes[0].id;
            // Select IDs that are greater than the average
            const types = await ItemType.findAll({
                where: {
                    id: {
                        [Op.gt]: targetId,
                    },
                },
                raw: true,
                order: [['id', 'ASC']],
            });
            console.log(
                `Result from half (id > ${targetId}) is: ${JSON.stringify(types, null, 2)}`,
            );
            res.status(200).json(types);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    async getTypesByTitle(req, res, next) {
        try {
            const { values } = req.body;
            if (!values || !Array.isArray(values) || values.length === 0) {
                return next(createError(400, 'Type titles are required'));
            }
            const types = await ItemType.findAll({
                where: {
                    title: {
                        [Op.in]: values,
                    },
                },
                raw: true,
                order: [['id', 'ASC']],
            });
            if (types.length === 0) {
                return next(createError(404, 'Types not found'));
            }
            console.log(`Result is: ${JSON.stringify(types, null, 2)}`);
            res.status(200).json(types);
        } catch (error) {
            console.log(error.message);
            next(error);
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
            next(error);
        }
    }

    async deleteType(req, res, next) {
        try {
            const { id } = req.params;
            const deletedRows = await ItemType.destroy({ where: { id } });
            if (deletedRows === 0) {
                return next(createError(404, 'Type not found'));
            }
            console.log(`Deleted rows: ${deletedRows}`);
            res.status(200).json({
                message: 'Type deleted successfully',
            });
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    async deleteTypesByTitles(req, res, next) {
        try {
            const { values } = req.body;
            if (!values || !Array.isArray(values) || values.length === 0) {
                return next(createError(400, 'Type titles are required'));
            }
            const deletedRows = await ItemType.destroy({
                where: {
                    title: {
                        [Op.in]: values,
                    },
                },
            });
            if (deletedRows === 0) {
                return next(createError(404, 'Types not found'));
            }
            console.log(`Deleted rows: ${deletedRows}`);
            res.status(200).json({
                message: 'Types deleted successfully',
            });
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    async updateType(req, res, next) {
        try {
            const { id, title, description } = req.body;
            const type = await ItemType.findByPk(id);
            if (!type) {
                return next(createError(404, 'Type not found'));
            }
            await type.update({ title, description });
            console.log(`Result is: ${JSON.stringify(type, null, 2)}`);
            res.status(200).json(type);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }
}

module.exports = new ItemTypesController();
