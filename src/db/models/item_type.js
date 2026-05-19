'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ItemType extends Model {
        static associate(models) {
            ItemType.hasMany(models.Item, {
                foreignKey: 'typeId',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
        }
    }
    ItemType.init(
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: 'ItemType',
            tableName: 'item_types',
            underscored: true,
        },
    );
    return ItemType;
};
