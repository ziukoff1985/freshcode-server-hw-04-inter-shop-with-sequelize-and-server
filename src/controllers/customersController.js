const createError = require('http-errors');

const { Customer } = require('../db/models/index');

class CustomersController {
    async getAllCustomers(req, res, next) {
        try {
            const customers = await Customer.findAll({
                limit: 10,
                order: [['id', 'ASC']],
            });
            if (customers.length === 0) {
                next(createError(404, 'Customers not found'));
            }
            console.log(`Result is: ${JSON.stringify(customers, null, 2)}`);
            res.status(200).json(customers);
        } catch (error) {
            console.log(error.message);
            next(error.message);
        }
    }

    async getCustomerById(req, res, next) {
        try {
            const { id } = req.params;
            const customer = await Customer.findByPk(id);
            if (!customer) {
                next(createError(404, 'Customer not found'));
            }
            console.log(`Result is: ${JSON.stringify(customer, null, 2)}`);
            res.status(200).json(customer);
        } catch (error) {
            console.log(error.message);
            next(error.message);
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
            next(error.message);
        }
    }

    async deleteCustomer(req, res, next) {
        try {
            const { id } = req.params;
            const customer = await Customer.destroy({ where: { id } });
            if (customer === 0) {
                next(createError(404, 'Customer not found'));
            }
            console.log(`Result is: ${customer}`);
            res.status(200).json(customer);
        } catch (error) {
            console.log(error.message);
            next(error.message);
        }
    }

    async updateCustomer(req, res, next) {
        try {
            const { id, name, email, password } = req.body;
            const customer = await Customer.findOne({ where: { id } });
            if (!customer) {
                next(createError(404, 'Customer not found'));
            }
            await customer.update({ name, email, password });
            console.log(`Result is: ${JSON.stringify(customer, null, 2)}`);
            res.status(200).json(customer);
        } catch (error) {
            console.log(error.message);
            next(error.message);
        }
    }
}

module.exports = new CustomersController();
