'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ItemsOrders extends Model {
        static associate(models) {}
    }
    ItemsOrders.init(
        {
            itemId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                field: 'item_id',
            },
            orderId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
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
