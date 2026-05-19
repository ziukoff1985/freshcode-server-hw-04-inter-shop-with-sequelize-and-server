'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ItemCategory extends Model {
        static associate(models) {
            ItemCategory.hasMany(models.Item, {
                foreignKey: 'categoryId',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
        }
    }
    ItemCategory.init(
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: 'ItemCategory',
            tableName: 'item_categories',
            underscored: true,
        },
    );
    return ItemCategory;
};
