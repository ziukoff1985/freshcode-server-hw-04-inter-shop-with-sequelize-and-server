const createError = require('http-errors');
const { Op } = require('sequelize');

const { Order, Customer, Item } = require('../db/models/index');

class OrdersController {
    async getAllOrders(req, res, next) {
        try {
            const { limit, offset } = req.pagination;
            const orders = await Order.findAll({
                attributes: ['id', 'code', 'paid', 'date', 'amount'],
                limit,
                offset,
                include: [
                    { model: Customer, attributes: ['name'] },
                    {
                        model: Item,
                        attributes: ['id', 'price'],
                        through: { attributes: [] },
                    },
                ],
                order: [['id', 'ASC']],
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
            const order = await Order.findByPk(id, {
                attributes: ['id', 'code', 'paid', 'date', 'amount'],
                include: [
                    { model: Customer, attributes: ['name'] },
                    {
                        model: Item,
                        attributes: ['id', 'price'],
                        through: { attributes: [] },
                    },
                ],
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

    async getOrdersFromHalf(req, res, next) {
        try {
            // get all ids from table
            const allOrders = await Order.findAll({
                attributes: ['id'],
                order: [['id', 'ASC']],
                raw: true,
            });
            if (allOrders.length === 0) {
                return next(createError(404, 'Orders not found'));
            }
            // find the index of the middle element of the array and get the actual ID from there.
            const halfIndex = Math.floor(allOrders.length / 2);
            const targetId =
                halfIndex > 0 ? allOrders[halfIndex - 1].id : allOrders[0].id;
            // Select IDs that are greater than the average
            const orders = await Order.findAll({
                attributes: ['id', 'code', 'paid', 'date', 'amount'],
                include: [
                    { model: Customer, attributes: ['name'] },
                    {
                        model: Item,
                        attributes: ['id', 'price'],
                        through: { attributes: [] },
                    },
                ],
                where: {
                    id: {
                        [Op.gt]: targetId,
                    },
                },
                order: [['id', 'ASC']],
            });
            console.log(
                `Result from half (id > ${targetId}) is: ${JSON.stringify(orders, null, 2)}`,
            );
            res.status(200).json(orders);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    async getOrdersByCustomer(req, res, next) {
        try {
            const { values } = req.body;

            const customers = await Customer.findAll({
                attributes: ['id'],
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
            const customerIds = customers.map((customer) => customer.id);
            const orders = await Order.findAll({
                attributes: ['id', 'code', 'paid', 'date', 'amount'],
                include: [
                    { model: Customer, attributes: ['name'] },
                    {
                        model: Item,
                        attributes: ['id', 'price'],
                        through: { attributes: [] },
                    },
                ],
                where: {
                    customerId: {
                        [Op.in]: customerIds,
                    },
                },
                order: [['id', 'ASC']],
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

    async createOrder(req, res, next) {
        try {
            const { code, paid, customerName, items } = req.body;

            // Find the customer by name
            const customer = await Customer.findOne({
                where: { name: customerName },
            });
            if (!customer) {
                return next(createError(404, 'Customer not found'));
            }

            // Check if there are any items
            if (!items || !Array.isArray(items) || items.length === 0) {
                return next(
                    createError(400, 'Order must contain at least one item'),
                );
            }

            // Check if all items exist in the database
            const dbItems = await Item.findAll({ where: { id: items } });
            if (dbItems.length !== items.length) {
                return next(
                    createError(404, 'One or more items not found in database'),
                );
            }
            // Calculate the total amount of the order
            const totalAmount = dbItems.reduce(
                (sum, item) => sum + Number(item.price),
                0,
            );
            // Create the order
            const order = await Order.create({
                code,
                amount: totalAmount, // Сума порахована сервером
                paid,
                customerId: customer.id,
            });

            // Add relationships to the 'items_orders' table
            await order.addItems(items);

            // Return the full order with items to the client
            const fullOrder = await Order.findByPk(order.id, {
                attributes: ['id', 'code', 'paid', 'date', 'amount'],
                include: [
                    { model: Customer, attributes: ['name'] },
                    {
                        model: Item,
                        attributes: ['id', 'price'],
                        through: { attributes: [] },
                    },
                ],
            });
            console.log(
                `Order created with items: ${JSON.stringify(fullOrder, null, 2)}`,
            );
            res.status(201).json(fullOrder);
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

    async deleteOrdersByCustomer(req, res, next) {
        try {
            const { values } = req.body;

            const customers = await Customer.findAll({
                attributes: ['id', 'name'],
                where: {
                    name: {
                        [Op.in]: values,
                    },
                },
                order: [['id', 'ASC']],
            });
            if (customers.length === 0) {
                return next(createError(404, 'Customers not found'));
            }
            const customerIds = customers.map((customer) => customer.id);
            const deletedRows = await Order.destroy({
                where: {
                    customerId: {
                        [Op.in]: customerIds,
                    },
                },
            });
            if (deletedRows === 0) {
                return next(createError(404, 'Orders not found'));
            }
            console.log(`Deleted rows: ${deletedRows}`);
            res.status(200).json({
                message: 'Orders deleted successfully',
            });
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    async updateOrder(req, res, next) {
        try {
            const { id, customerName, items, ...restUpdateData } = req.body;

            // Find the customer by name
            const customer = await Customer.findOne({
                where: { name: customerName },
            });
            if (!customer) {
                return next(createError(404, 'Customer not found'));
            }

            // Check if there are any items
            if (!items || !Array.isArray(items) || items.length === 0) {
                return next(
                    createError(400, 'Order must contain at least one item'),
                );
            }

            // Check if all items exist in the database
            const dbItems = await Item.findAll({ where: { id: items } });
            if (dbItems.length !== items.length) {
                return next(
                    createError(404, 'One or more items not found in database'),
                );
            }

            // Calculate the total amount of the order
            const totalAmount = dbItems.reduce(
                (sum, item) => sum + Number(item.price),
                0,
            );

            // Find the order by id
            const order = await Order.findByPk(id);
            if (!order) {
                return next(createError(404, 'Order not found'));
            }

            // Update the order
            await order.update({
                ...restUpdateData,
                amount: totalAmount,
                customerId: customer.id,
            });

            // Add relationships to the 'items_orders' table
            await order.setItems(items);

            // Return the full order with items to the client
            const fullOrder = await Order.findByPk(order.id, {
                include: [
                    { model: Customer, attributes: ['name'] },
                    {
                        model: Item,
                        attributes: ['id', 'price'],
                        through: { attributes: [] },
                    },
                ],
            });
            console.log(
                `Order updated with items: ${JSON.stringify(fullOrder, null, 2)}`,
            );
            res.status(200).json(fullOrder);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }
}

module.exports = new OrdersController();
