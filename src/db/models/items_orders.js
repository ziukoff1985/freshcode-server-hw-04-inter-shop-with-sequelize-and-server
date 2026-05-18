'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ItemsOrders extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    ItemsOrders.init(
        {
            itemId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'item_id',
            },
            orderId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'order_id',
            },
        },
        {
            sequelize,
            modelName: 'ItemsOrders',
            tableName: 'items_orders',
            timestamps: false,
            underscored: true,
        },
    );
    return ItemsOrders;
};
