const createError = require('http-errors');

const {
    Item,
    ItemCategory,
    ItemType,
    Brand,
    Model,
    Store,
} = require('../db/models/index');

class ItemsController {
    async getAllItems(req, res, next) {
        try {
            const items = await Item.findAll({
                limit: 10,
                order: [['id', 'ASC']],
                attributes: ['id', 'price', 'amount'],
                include: [
                    { model: ItemCategory, attributes: ['title'] },
                    { model: ItemType, attributes: ['title'] },
                    { model: Brand, attributes: ['title'] },
                    { model: Model, attributes: ['title'] },
                    { model: Store, attributes: ['title'] },
                ],
            });
            if (items.length === 0) {
                return next(createError(404, 'Items not found'));
            }
            console.log(`Result is: ${JSON.stringify(items, null, 2)}`);
            res.status(200).json(items);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    async getItemById(req, res, next) {
        try {
            const { id } = req.params;
            const item = await Item.findOne({
                where: { id },
                attributes: ['id', 'price', 'amount'],
                include: [
                    { model: ItemCategory, attributes: ['title'] },
                    { model: ItemType, attributes: ['title'] },
                    { model: Brand, attributes: ['title'] },
                    { model: Model, attributes: ['title'] },
                    { model: Store, attributes: ['title'] },
                ],
            });
            if (!item) {
                return next(createError(404, 'Item not found'));
            }
            console.log(`Result is: ${JSON.stringify(item, null, 2)}`);
            res.status(200).json(item);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    async createItem(req, res, next) {
        try {
            const {
                categoryTitle,
                typeTitle,
                brandTitle,
                modelTitle,
                price,
                storeTitle,
                amount,
            } = req.body;

            const category = await ItemCategory.findOne({
                where: { title: categoryTitle },
            });
            const type = await ItemType.findOne({
                where: { title: typeTitle },
            });
            const brand = await Brand.findOne({
                where: { title: brandTitle },
            });
            const model = await Model.findOne({
                where: { title: modelTitle },
            });
            const store = await Store.findOne({
                where: { title: storeTitle },
            });

            if (!category) {
                return next(createError(404, 'Category not found'));
            }
            if (!type) {
                return next(createError(404, 'Type not found'));
            }
            if (!brand) {
                return next(createError(404, 'Brand not found'));
            }
            if (!model) {
                return next(createError(404, 'Model not found'));
            }
            if (!store) {
                return next(createError(404, 'Store not found'));
            }

            const item = await Item.create({
                categoryId: category.id,
                typeId: type.id,
                brandId: brand.id,
                modelId: model.id,
                storeId: store.id,
                price,
                amount,
            });

            console.log(`Result is: ${JSON.stringify(item, null, 2)}`);
            res.status(201).json(item);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    async deleteItem(req, res, next) {
        try {
            const { id } = req.params;
            const deletedRows = await Item.destroy({ where: { id } });
            if (deletedRows === 0) {
                return next(createError(404, 'Item not found'));
            }
            console.log(`Deleted rows: ${deletedRows}`);
            res.status(200).json({
                message: 'Item deleted successfully',
            });
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    async updateItem(req, res, next) {
        try {
            const {
                id,
                categoryTitle,
                typeTitle,
                brandTitle,
                modelTitle,
                storeTitle,
                ...restUpdatedData
            } = req.body;

            const category = await ItemCategory.findOne({
                where: { title: categoryTitle },
            });
            const type = await ItemType.findOne({
                where: { title: typeTitle },
            });
            const brand = await Brand.findOne({
                where: { title: brandTitle },
            });
            const model = await Model.findOne({
                where: { title: modelTitle },
            });
            const store = await Store.findOne({
                where: { title: storeTitle },
            });

            if (!category) {
                return next(createError(404, 'Category not found'));
            }
            if (!type) {
                return next(createError(404, 'Type not found'));
            }
            if (!brand) {
                return next(createError(404, 'Brand not found'));
            }
            if (!model) {
                return next(createError(404, 'Model not found'));
            }
            if (!store) {
                return next(createError(404, 'Store not found'));
            }

            const item = await Item.findOne({ where: { id } });
            if (!item) {
                return next(createError(404, 'Item not found'));
            }
            await item.update({
                ...restUpdatedData,
                categoryId: category.id,
                typeId: type.id,
                brandId: brand.id,
                modelId: model.id,
                storeId: store.id,
            });
            console.log(`Result is: ${JSON.stringify(item, null, 2)}`);
            res.status(200).json(item);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }
}

module.exports = new ItemsController();
