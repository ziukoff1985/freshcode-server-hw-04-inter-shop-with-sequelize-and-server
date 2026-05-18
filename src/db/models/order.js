'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Order.init(
        {
            code: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            date: DataTypes.DATE,
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
