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
            });
        }
    }
    Order.init(
        {
            code: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
            amount: {
                type: DataTypes.DECIMAL,
                allowNull: false,
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
