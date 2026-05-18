'use strict';
const { Model, Sequelize } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Order.belongsTo(models.Customer, {
                foreignKey: 'customerId',
            });
            Order.belongsToMany(models.Item, {
                through: models.ItemsOrders,
                foreignKey: 'orderId',
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
