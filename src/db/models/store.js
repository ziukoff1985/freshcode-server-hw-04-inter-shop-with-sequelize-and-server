'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Store extends Model {
        static associate(models) {
            Store.hasMany(models.Item, {
                foreignKey: 'storeId',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
        }
    }
    Store.init(
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    name: 'stores_title_unique',
                    msg: 'Store title already exists',
                },
            },
            description: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: 'Store',
            tableName: 'stores',
            underscored: true,
        },
    );
    return Store;
};
