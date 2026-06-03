const createError = require('http-errors');
const { Op } = require('sequelize');

const { Customer } = require('../db/models/index');

class CustomersController {
    async getAllCustomers(req, res, next) {
        try {
            const { limit, offset } = req.pagination;
            const customers = await Customer.findAll({
                raw: true,
                limit,
                offset,
                order: [['id', 'ASC']],
            });
            if (customers.length === 0) {
                return next(createError(404, 'Customers not found'));
            }
            console.log(`Result is: ${JSON.stringify(customers, null, 2)}`);
            res.status(200).json(customers);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    async getCustomerById(req, res, next) {
        try {
            const { id } = req.params;
            const customer = await Customer.findByPk(id, {
                raw: true,
            });
            if (!customer) {
                return next(createError(404, 'Customer not found'));
            }
            console.log(`Result is: ${JSON.stringify(customer, null, 2)}`);
            res.status(200).json(customer);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    async getCustomersFromHalf(req, res, next) {
        try {
            // get all ids from table
            const allCustomers = await Customer.findAll({
                attributes: ['id'],
                order: [['id', 'ASC']],
                raw: true,
            });
            // find the index of the middle element of the array and get the actual ID from there.
            const halfIndex = Math.floor(allCustomers.length / 2);
            const targetId =
                halfIndex > 0
                    ? allCustomers[halfIndex - 1].id
                    : allCustomers[0].id;
            // Select IDs that are greater than the average
            const customers = await Customer.findAll({
                where: {
                    id: {
                        [Op.gt]: targetId,
                    },
                },
                raw: true,
                order: [['id', 'ASC']],
            });
            console.log(
                `Result from half (id > ${targetId}) is: ${JSON.stringify(customers, null, 2)}`,
            );
            res.status(200).json(customers);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    async getCustomersByNames(req, res, next) {
        try {
            const { values } = req.body;

            const customers = await Customer.findAll({
                where: {
                    name: {
                        [Op.in]: values,
                    },
                },
                raw: true,
                order: [['id', 'ASC']],
            });
            if (customers.length === 0) {
                return next(createError(404, 'Customers not found'));
            }
            console.log(`Result is: ${JSON.stringify(customers, null, 2)}`);
            res.status(200).json(customers);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    async createCustomer(req, res, next) {
        try {
            const { name, email, password } = req.body;
            const customer = await Customer.create({ name, email, password });
            console.log(`Result is: ${JSON.stringify(customer, null, 2)}`);
            res.status(201).json(customer);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    async deleteCustomer(req, res, next) {
        try {
            const { id } = req.params;
            const deletedRows = await Customer.destroy({ where: { id } });
            if (deletedRows === 0) {
                return next(createError(404, 'Customer not found'));
            }
            console.log(`Deleted rows: ${deletedRows}`);
            res.status(200).json({
                message: 'Customer deleted successfully',
            });
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    async deleteCustomersByNames(req, res, next) {
        try {
            const { values } = req.body;

            const deletedRows = await Customer.destroy({
                where: {
                    name: {
                        [Op.in]: values,
                    },
                },
            });
            if (deletedRows === 0) {
                return next(createError(404, 'Customers not found'));
            }
            console.log(`Deleted rows: ${deletedRows}`);
            res.status(200).json({
                message: 'Customers deleted successfully',
            });
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    async updateCustomer(req, res, next) {
        try {
            const { id, name, email, password } = req.body;
            const customer = await Customer.findByPk(id);
            if (!customer) {
                return next(createError(404, 'Customer not found'));
            }
            await customer.update({ name, email, password });
            console.log(`Result is: ${JSON.stringify(customer, null, 2)}`);
            res.status(200).json(customer);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }
}

module.exports = new CustomersController();
