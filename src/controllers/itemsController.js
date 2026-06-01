const createError = require('http-errors');
const { Op } = require('sequelize');

const {
    Item,
    ItemCategory,
    ItemType,
    Brand,
    Model,
    Store,
} = require('../db/models/index');

const itemIncludes = [
    { model: ItemCategory, attributes: ['title'] },
    { model: ItemType, attributes: ['title'] },
    { model: Brand, attributes: ['title'] },
    { model: Model, attributes: ['title'] },
    { model: Store, attributes: ['title'] },
];

// Helper function to get foreign keys from titles
async function getDependencyIds(titles, next) {
    const { categoryTitle, typeTitle, brandTitle, modelTitle, storeTitle } =
        titles;

    const [category, type, brand, model, store] = await Promise.all([
        ItemCategory.findOne({ where: { title: categoryTitle } }),
        ItemType.findOne({ where: { title: typeTitle } }),
        Brand.findOne({ where: { title: brandTitle } }),
        Model.findOne({ where: { title: modelTitle } }),
        Store.findOne({ where: { title: storeTitle } }),
    ]);

    if (!category) return next(createError(404, 'Category not found'));
    if (!type) return next(createError(404, 'Type not found'));
    if (!brand) return next(createError(404, 'Brand not found'));
    if (!model) return next(createError(404, 'Model not found'));
    if (!store) return next(createError(404, 'Store not found'));

    // Return clear foreign keys
    return {
        categoryId: category.id,
        typeId: type.id,
        brandId: brand.id,
        modelId: model.id,
        storeId: store.id,
    };
}

class ItemsController {
    async getAllItems(req, res, next) {
        try {
            const { limit, offset } = req.pagination;
            const items = await Item.findAll({
                limit,
                offset,
                attributes: ['id', 'price', 'amount'],
                include: itemIncludes,
                order: [['id', 'ASC']],
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
                include: itemIncludes,
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

    async getItemsFromHalf(req, res, next) {
        try {
            // get all ids from table
            const allItems = await Item.findAll({
                attributes: ['id'],
                order: [['id', 'ASC']],
            });
            if (allItems.length === 0) {
                return next(createError(404, 'Items not found'));
            }
            // find the index of the middle element of the array and get the actual ID from there.
            const halfIndex = Math.floor(allItems.length / 2);
            const targetId =
                halfIndex > 0 ? allItems[halfIndex - 1].id : allItems[0].id;
            const items = await Item.findAll({
                attributes: ['id', 'price', 'amount'],
                where: {
                    id: {
                        [Op.gt]: targetId,
                    },
                },
                include: itemIncludes,
                order: [['id', 'ASC']],
            });
            console.log(
                `Result from half (id > ${targetId}) is: ${JSON.stringify(items, null, 2)}`,
            );
            res.status(200).json(items);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    async getItemsByBrand(req, res, next) {
        try {
            const { values } = req.body;
            if (!values || !Array.isArray(values) || values.length === 0) {
                return next(createError(400, 'Brand titles are required'));
            }
            const brands = await Brand.findAll({
                attributes: ['id'],
                where: {
                    title: {
                        [Op.in]: values,
                    },
                },
                raw: true,
                order: [['id', 'ASC']],
            });
            if (brands.length === 0) {
                return next(createError(404, 'Brands not found'));
            }
            const brandIds = brands.map((brand) => brand.id);
            const items = await Item.findAll({
                attributes: ['id', 'price', 'amount'],
                include: itemIncludes,
                where: {
                    brandId: {
                        [Op.in]: brandIds,
                    },
                },
                order: [['id', 'ASC']],
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

    async createItem(req, res, next) {
        try {
            const { price, amount, ...titles } = req.body;
            const ids = await getDependencyIds(titles, next);
            if (!ids) return;
            const item = await Item.create({
                ...ids,
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

    async deleteItemsByBrands(req, res, next) {
        try {
            const { values } = req.body;
            if (!values || !Array.isArray(values) || values.length === 0) {
                return next(createError(400, 'Brand titles are required'));
            }
            const brands = await Brand.findAll({
                where: {
                    title: {
                        [Op.in]: values,
                    },
                },
                order: [['id', 'ASC']],
            });
            if (brands.length === 0) {
                return next(createError(404, 'Brands not found'));
            }
            const brandIds = brands.map((brand) => brand.id);
            const deletedRows = await Item.destroy({
                where: {
                    brandId: {
                        [Op.in]: brandIds,
                    },
                },
            });
            if (deletedRows === 0) {
                return next(createError(404, 'Items not found'));
            }
            console.log(`Deleted rows: ${deletedRows}`);
            res.status(200).json({
                message: 'Items deleted successfully',
            });
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    async updateItem(req, res, next) {
        try {
            const { id, price, amount, ...titles } = req.body;
            const ids = await getDependencyIds(titles, next);
            if (!ids) return;
            const item = await Item.findOne({ where: { id } });
            if (!item) {
                return next(createError(404, 'Item not found'));
            }
            await item.update({
                ...ids,
                price,
                amount,
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
