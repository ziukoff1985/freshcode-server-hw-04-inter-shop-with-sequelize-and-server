'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Item extends Model {
        static associate(models) {
            Item.belongsTo(models.ItemCategory, {
                foreignKey: 'categoryId',
            });
            Item.belongsTo(models.ItemType, {
                foreignKey: 'typeId',
            });
            Item.belongsTo(models.Brand, {
                foreignKey: 'brandId',
            });
            Item.belongsTo(models.Model, {
                foreignKey: 'modelId',
            });
            Item.belongsTo(models.Store, {
                foreignKey: 'storeId',
            });
            Item.belongsToMany(models.Order, {
                through: models.ItemsOrders,
                foreignKey: 'itemId',
                otherKey: 'orderId',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
        }
    }
    Item.init(
        {
            categoryId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'category_id',
            },
            typeId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'type_id',
            },
            brandId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'brand_id',
            },
            modelId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'model_id',
            },
            price: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
                defaultValue: 0.0,
                get() {
                    const value = this.getDataValue('price');
                    return value === null ? null : parseFloat(value);
                },
            },
            storeId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'store_id',
            },
            amount: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1,
            },
        },
        {
            sequelize,
            modelName: 'Item',
            tableName: 'items',
            underscored: true,
        },
    );
    return Item;
};
