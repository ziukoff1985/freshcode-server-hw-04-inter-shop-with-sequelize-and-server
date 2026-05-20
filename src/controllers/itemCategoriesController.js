const createError = require('http-errors');

const { ItemCategory } = require('../db/models/index');

class ItemCategoriesController {
    async getAllCategories(req, res, next) {
        try {
            const categories = await ItemCategory.findAll({
                limit: 10,
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

    async updateCategory(req, res, next) {
        try {
            const { id, title, description } = req.body;
            const category = await ItemCategory.findOne({ where: { id } });
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
