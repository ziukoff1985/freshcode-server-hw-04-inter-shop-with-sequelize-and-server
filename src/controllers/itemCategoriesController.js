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
                next(createError(404, 'Categories not found'));
            }
            console.log(`Result is: ${JSON.stringify(categories, null, 2)}`);
            res.status(200).json(categories);
        } catch (error) {
            console.log(error.message);
            next(error.message);
        }
    }

    async getCategoryById(req, res, next) {
        try {
            const { id } = req.params;
            const category = await ItemCategory.findByPk(id);
            if (!category) {
                next(createError(404, 'Category not found'));
            }
            console.log(`Result is: ${JSON.stringify(category, null, 2)}`);
            res.status(200).json(category);
        } catch (error) {
            console.log(error.message);
            next(error.message);
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
            next(error.message);
        }
    }

    async deleteCategory(req, res, next) {
        try {
            const { id } = req.params;
            const category = await ItemCategory.destroy({ where: { id } });
            if (category === 0) {
                next(createError(404, 'Category not found'));
            }
            console.log(`Result is: ${category}`);
            res.status(200).json(category);
        } catch (error) {
            console.log(error.message);
            next(error.message);
        }
    }

    async updateCategory(req, res, next) {
        try {
            const { id, title, description } = req.body;
            const category = await ItemCategory.findOne({ where: { id } });
            if (!category) {
                next(createError(404, 'Category not found'));
            }
            await category.update({ title, description });
            console.log(`Result is: ${JSON.stringify(category, null, 2)}`);
            res.status(200).json(category);
        } catch (error) {
            console.log(error.message);
            next(error.message);
        }
    }
}

module.exports = new ItemCategoriesController();
