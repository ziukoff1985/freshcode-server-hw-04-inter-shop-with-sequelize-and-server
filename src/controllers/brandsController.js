const createError = require('http-errors');
const { Op } = require('sequelize');

const { Brand } = require('../db/models/index');

class BrandsController {
    async getAllBrands(req, res, next) {
        try {
            const { limit, offset } = req.pagination;
            const brands = await Brand.findAll({
                raw: true,
                limit,
                offset,
                order: [['id', 'ASC']],
            });
            if (brands.length === 0) {
                return next(createError(404, 'Brands not found'));
            }
            console.log(`Result is: ${JSON.stringify(brands, null, 2)}`);
            res.status(200).json(brands);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    async getBrandById(req, res, next) {
        try {
            const { id } = req.params;
            const brand = await Brand.findByPk(id, {
                raw: true,
            });
            if (!brand) {
                return next(createError(404, 'Brand not found'));
            }
            console.log(`Result is: ${JSON.stringify(brand, null, 2)}`);
            res.status(200).json(brand);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    async getBrandsFromHalf(req, res, next) {
        try {
            // get all ids from table
            const allBrands = await Brand.findAll({
                attributes: ['id'],
                order: [['id', 'ASC']],
                raw: true,
            });

            if (allBrands.length === 0) {
                return next(createError(404, 'Brands not found'));
            }

            // find the index of the middle element of the array and get the actual ID from there.
            const halfIndex = Math.floor(allBrands.length / 2);
            const targetId =
                halfIndex > 0 ? allBrands[halfIndex - 1].id : allBrands[0].id;

            // Select IDs that are greater than the average
            const brands = await Brand.findAll({
                where: {
                    id: {
                        [Op.gt]: targetId,
                    },
                },
                raw: true,
                order: [['id', 'ASC']],
            });
            console.log(
                `Result from half (id > ${targetId}) is: ${JSON.stringify(brands, null, 2)}`,
            );
            res.status(200).json(brands);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    async getBrandsByTitle(req, res, next) {
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
                raw: true,
                order: [['id', 'ASC']],
            });
            if (brands.length === 0) {
                return next(createError(404, 'Brands not found'));
            }

            console.log(`Result is: ${JSON.stringify(brands, null, 2)}`);
            res.status(200).json(brands);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    async createBrand(req, res, next) {
        try {
            const { title, description } = req.body;

            const brand = await Brand.create({ title, description });

            console.log(`Result is: ${JSON.stringify(brand, null, 2)}`);
            res.status(201).json(brand);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    async deleteBrand(req, res, next) {
        try {
            const { id } = req.params;

            const deletedRows = await Brand.destroy({ where: { id } });
            if (deletedRows === 0) {
                return next(createError(404, 'Brand not found'));
            }

            console.log(`Deleted rows: ${deletedRows}`);
            res.status(200).json({
                message: 'Brand deleted successfully',
            });
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    async deleteBrandsByTitles(req, res, next) {
        try {
            const { values } = req.body;
            if (!values || !Array.isArray(values) || values.length === 0) {
                return next(createError(400, 'Brand titles are required'));
            }

            const deletedRows = await Brand.destroy({
                where: {
                    title: {
                        [Op.in]: values,
                    },
                },
            });
            if (deletedRows === 0) {
                return next(createError(404, 'Brands not found'));
            }

            console.log(`Deleted rows: ${deletedRows}`);
            res.status(200).json({
                message: 'Brands deleted successfully',
            });
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    async updateBrand(req, res, next) {
        try {
            const { id, title, description } = req.body;

            const brand = await Brand.findByPk(id);
            if (!brand) {
                return next(createError(404, 'Brand not found'));
            }

            await brand.update({ title, description });

            console.log(`Result is: ${JSON.stringify(brand, null, 2)}`);
            res.status(200).json(brand);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }
}

module.exports = new BrandsController();
