const createError = require('http-errors');

const { Order, Customer } = require('../db/models/index');

class OrdersController {
    async getAllOrders(req, res, next) {
        try {
            const orders = await Order.findAll({
                limit: 10,
                order: [['id', 'ASC']],
                include: [{ model: Customer, attributes: ['name'] }],
            });
            if (orders.length === 0) {
                return next(createError(404, 'Orders not found'));
            }
            console.log(`Result is: ${JSON.stringify(orders, null, 2)}`);
            res.status(200).json(orders);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    async getOrderById(req, res, next) {
        try {
            const { id } = req.params;

            const order = await Order.findOne({
                where: { id },
                include: [{ model: Customer, attributes: ['name'] }],
            });

            if (!order) {
                return next(createError(404, 'Order not found'));
            }
            console.log(`Result is: ${JSON.stringify(order, null, 2)}`);
            res.status(200).json(order);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    async createOrder(req, res, next) {
        try {
            const { code, amount, paid, customerName } = req.body;
            const customer = await Customer.findOne({
                where: { name: customerName },
            });

            if (!customer) {
                return next(createError(404, 'Customer not found'));
            }

            const order = await Order.create({
                code,
                amount,
                paid,
                customerId: customer.id,
            });

            console.log(`Result is: ${JSON.stringify(order, null, 2)}`);
            res.status(201).json(order);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    async deleteOrder(req, res, next) {
        try {
            const { id } = req.params;
            const deletedRows = await Order.destroy({ where: { id } });
            if (deletedRows === 0) {
                return next(createError(404, 'Order not found'));
            }
            console.log(`Deleted rows: ${deletedRows}`);
            res.status(200).json({
                message: 'Order deleted successfully',
            });
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    async updateOrder(req, res, next) {
        try {
            const { id, customerName, ...restUpdateData } = req.body;

            const customer = await Customer.findOne({
                where: { name: customerName },
            });

            if (!customer) {
                return next(createError(404, 'Customer not found'));
            }

            const order = await Order.findOne({
                where: { id },
            });
            if (!order) {
                return next(createError(404, 'Order not found'));
            }

            await order.update({
                ...restUpdateData,
                customerId: customer.id,
            });

            console.log(`Result is: ${JSON.stringify(order, null, 2)}`);
            res.status(200).json(order);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }
}

module.exports = new OrdersController();
