const createError = require('http-errors');

const { Brand } = require('../db/models/index');

class BrandsController {
    async getAllBrands(req, res, next) {
        try {
            const brands = await Brand.findAll({
                limit: 10,
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
            const brand = await Brand.findByPk(id);
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
