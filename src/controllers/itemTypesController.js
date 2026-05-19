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
                next(createError(404, 'Brands not found'));
            }
            console.log(`Result is: ${JSON.stringify(brands, null, 2)}`);
            res.status(200).json(brands);
        } catch (error) {
            console.log(error.message);
            next(error.message);
        }
    }

    async getBrandById(req, res, next) {
        try {
            const { id } = req.params;
            const brand = await Brand.findByPk(id);
            if (!brand) {
                next(createError(404, 'Brand not found'));
            }
            console.log(`Result is: ${JSON.stringify(brand, null, 2)}`);
            res.status(200).json(brand);
        } catch (error) {
            console.log(error.message);
            next(error.message);
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
            next(error.message);
        }
    }

    async deleteBrand(req, res, next) {
        try {
            const { id } = req.params;
            const brand = await Brand.destroy({ where: { id } });
            if (brand === 0) {
                next(createError(404, 'Brand not found'));
            }
            console.log(`Result is: ${brand}`);
            res.status(200).json(brand);
        } catch (error) {
            console.log(error.message);
            next(error.message);
        }
    }

    async updateBrand(req, res, next) {
        try {
            const { id, title, description } = req.body;
            const brand = await Brand.findOne({ where: { id } });
            if (!brand) {
                next(createError(404, 'Brand not found'));
            }
            await brand.update({ title, description });
            console.log(`Result is: ${JSON.stringify(brand, null, 2)}`);
            res.status(200).json(brand);
        } catch (error) {
            console.log(error.message);
            next(error.message);
        }
    }
}

module.exports = new BrandsController();
