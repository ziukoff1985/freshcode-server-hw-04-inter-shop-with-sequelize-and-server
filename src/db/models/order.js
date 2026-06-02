'use strict';
const { Model, Sequelize } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        static associate(models) {
            Order.belongsTo(models.Customer, {
                foreignKey: 'customerId',
            });
            Order.belongsToMany(models.Item, {
                through: models.ItemsOrders,
                foreignKey: 'orderId',
                otherKey: 'itemId',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
        }
    }
    Order.init(
        {
            code: {
                type: DataTypes.INTEGER,
                // allowNull: false,
                unique: {
                    name: 'orders_code_unique',
                    msg: 'Order code already exists',
                },
                defaultValue: Sequelize.literal("nextval('order_code_seq')"),
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
            amount: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
                get() {
                    const value = this.getDataValue('amount');
                    return value === null ? null : parseFloat(value);
                },
            },
            paid: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            customerId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'customer_id',
            },
        },
        {
            sequelize,
            modelName: 'Order',
            tableName: 'orders',
            underscored: true,
        },
    );
    return Order;
};
