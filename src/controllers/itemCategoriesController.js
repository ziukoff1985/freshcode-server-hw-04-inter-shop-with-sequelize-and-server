const createError = require('http-errors');
const { Op } = require('sequelize');

const { ItemCategory } = require('../db/models/index');

class ItemCategoriesController {
    async getAllCategories(req, res, next) {
        try {
            const { limit, offset } = req.pagination;

            const categories = await ItemCategory.findAll({
                raw: true,
                limit,
                offset,
                order: [['id', 'ASC']],
            });
            if (categories.length === 0) {
                return next(createError(404, 'Categories not found'));
            }
            console.log(`Result is: ${JSON.stringify(categories, null, 2)}`);
            res.status(200).json(categories);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    async getCategoryById(req, res, next) {
        try {
            const { id } = req.params;
            const category = await ItemCategory.findByPk(id);
            if (!category) {
                return next(createError(404, 'Category not found'));
            }
            console.log(`Result is: ${JSON.stringify(category, null, 2)}`);
            res.status(200).json(category);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    async getCategoriesFromHalf(req, res, next) {
        try {
            // get all ids from table
            const allCategories = await ItemCategory.findAll({
                attributes: ['id'],
                order: [['id', 'ASC']],
                raw: true,
            });

            if (allCategories.length === 0) {
                return next(createError(404, 'Categories not found'));
            }

            // find the index of the middle element of the array and get the actual ID from there.
            const halfIndex = Math.floor(allCategories.length / 2);
            const targetId = allCategories[halfIndex - 1].id;

            // Select IDs that are greater than the average
            const categories = await ItemCategory.findAll({
                where: {
                    id: {
                        [Op.gt]: targetId,
                    },
                },
                order: [['id', 'ASC']],
            });
            console.log(
                `Result from half (id > ${targetId}) is: ${JSON.stringify(categories, null, 2)}`,
            );
            res.status(200).json(categories);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    async getCategoriesByTitle(req, res, next) {
        try {
            const { values } = req.body;

            if (!values || !Array.isArray(values) || values.length === 0) {
                return next(createError(400, 'Category titles are required'));
            }

            const categories = await ItemCategory.findAll({
                where: {
                    title: {
                        [Op.in]: values,
                    },
                },
                order: [['id', 'ASC']],
            });
            if (categories.length === 0) {
                return next(createError(404, 'Categories not found'));
            }
            console.log(`Result is: ${JSON.stringify(categories, null, 2)}`);
            res.status(200).json(categories);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    async createCategory(req, res, next) {
        try {
            const { title, description } = req.body;
            const category = await ItemCategory.create({ title, description });
            console.log(`Result is: ${JSON.stringify(category, null, 2)}`);
            res.status(201).json(category);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    async deleteCategory(req, res, next) {
        try {
            const { id } = req.params;
            const deletedRows = await ItemCategory.destroy({ where: { id } });
            if (deletedRows === 0) {
                return next(createError(404, 'Category not found'));
            }
            console.log(`Deleted rows: ${deletedRows}`);
            res.status(200).json({
                message: 'Category deleted successfully',
            });
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    async deleteCategoriesByTitles(req, res, next) {
        try {
            const { values } = req.body;

            if (!values || !Array.isArray(values) || values.length === 0) {
                return next(createError(400, 'Category titles are required'));
            }

            const deletedRows = await ItemCategory.destroy({
                where: {
                    title: {
                        [Op.in]: values,
                    },
                },
            });

            if (deletedRows === 0) {
                return next(createError(404, 'Categories not found'));
            }

            console.log(`Deleted rows: ${deletedRows}`);
            res.status(200).json({
                message: 'Categories deleted successfully',
            });
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    async updateCategory(req, res, next) {
        try {
            const { id, title, description } = req.body;
            const category = await ItemCategory.findByPk(id);
            if (!category) {
                return next(createError(404, 'Category not found'));
            }
            await category.update({ title, description });
            console.log(`Result is: ${JSON.stringify(category, null, 2)}`);
            res.status(200).json(category);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }
}

module.exports = new ItemCategoriesController();
