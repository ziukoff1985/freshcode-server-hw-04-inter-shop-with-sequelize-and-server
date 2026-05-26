const createError = require('http-errors');

const { Order, Customer, Item } = require('../db/models/index');

class OrdersController {
    async getAllOrders(req, res, next) {
        try {
            const orders = await Order.findAll({
                limit: 10,
                order: [['id', 'ASC']],
                include: [
                    { model: Customer, attributes: ['name'] },
                    {
                        model: Item,
                        attributes: ['id', 'price'],
                        through: { attributes: [] },
                    },
                ],
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

    async createOrder(req, res, next) {
        try {
            const { code, paid, customerName, items } = req.body;

            // 1. Перевіряємо клієнта
            const customer = await Customer.findOne({
                where: { name: customerName },
            });
            if (!customer) {
                return next(createError(404, 'Customer not found'));
            }

            // 2. Якщо масив товарів порожній або не переданий — це помилка
            if (!items || !Array.isArray(items) || items.length === 0) {
                return next(
                    createError(400, 'Order must contain at least one item'),
                );
            }

            // 3. Рахуємо загальну суму замовлення (amount) автоматично на основі цін товарів в БД!
            // Це набагато безпечніше, ніж вірити сумі, яку прислав фронтенд.
            const dbItems = await Item.findAll({ where: { id: items } });
            if (dbItems.length !== items.length) {
                return next(
                    createError(404, 'One or more items not found in database'),
                );
            }
            console.log('dbItems:', dbItems);

            const totalAmount = dbItems.reduce(
                (sum, item) => sum + Number(item.price),
                0,
            );
            console.log('totalAmount:', totalAmount);

            // 4. Створюємо замовлення
            const order = await Order.create({
                code,
                amount: totalAmount, // Сума порахована сервером
                paid,
                customerId: customer.id,
            });

            // 5. МАГІЯ SEQUELIZE: додаємо зв'язки в таблицю items_orders
            // Метод addItems з'являється автоматично, якщо налаштовано Order.belongsToMany(Item)
            await order.addItems(items);

            // Повертаємо замовлення разом із підтягнутими товарами для красивої відповіді клієнту
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
                `Order created with items: ${JSON.stringify(fullOrder, null, 2)}`,
            );
            res.status(201).json(fullOrder);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    // async createOrder(req, res, next) {
    //     try {
    //         const { code, amount, paid, customerName } = req.body;
    //         const customer = await Customer.findOne({
    //             where: { name: customerName },
    //         });

    //         if (!customer) {
    //             return next(createError(404, 'Customer not found'));
    //         }

    //         const order = await Order.create({
    //             code,
    //             amount,
    //             paid,
    //             customerId: customer.id,
    //         });

    //         console.log(`Result is: ${JSON.stringify(order, null, 2)}`);
    //         res.status(201).json(order);
    //     } catch (error) {
    //         console.log(error.message);
    //         next(error);
    //     }
    // }

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
            const { id, customerName, items, ...restUpdateData } = req.body;

            const customer = await Customer.findOne({
                where: { name: customerName },
            });
            if (!customer) {
                return next(createError(404, 'Customer not found'));
            }

            if (!items || !Array.isArray(items) || items.length === 0) {
                return next(
                    createError(400, 'Order must contain at least one item'),
                );
            }

            const dbItems = await Item.findAll({ where: { id: items } });
            if (dbItems.length !== items.length) {
                return next(
                    createError(404, 'One or more items not found in database'),
                );
            }

            const totalAmount = dbItems.reduce(
                (sum, item) => sum + Number(item.price),
                0,
            );

            const order = await Order.findOne({ where: { id } });
            if (!order) {
                return next(createError(404, 'Order not found'));
            }

            await order.update({
                ...restUpdateData,
                amount: totalAmount,
                customerId: customer.id,
            });

            await order.setItems(items);

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

    // async updateOrder(req, res, next) {
    //     try {
    //         const { id, customerName, ...restUpdateData } = req.body;

    //         const customer = await Customer.findOne({
    //             where: { name: customerName },
    //         });

    //         if (!customer) {
    //             return next(createError(404, 'Customer not found'));
    //         }

    //         const order = await Order.findOne({
    //             where: { id },
    //         });
    //         if (!order) {
    //             return next(createError(404, 'Order not found'));
    //         }

    //         await order.update({
    //             ...restUpdateData,
    //             customerId: customer.id,
    //         });

    //         console.log(`Result is: ${JSON.stringify(order, null, 2)}`);
    //         res.status(200).json(order);
    //     } catch (error) {
    //         console.log(error.message);
    //         next(error);
    //     }
    // }
}

module.exports = new OrdersController();
