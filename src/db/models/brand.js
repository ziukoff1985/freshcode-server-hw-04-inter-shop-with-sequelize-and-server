'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Brand extends Model {
        static associate(models) {
            Brand.hasMany(models.Model, {
                foreignKey: 'brandId',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
            Brand.hasMany(models.Item, {
                foreignKey: 'brandId',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
        }
    }
    Brand.init(
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    name: 'brands_title_unique',
                    msg: 'Brand title already exists',
                },
            },
            description: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: 'Brand',
            tableName: 'brands',
            underscored: true,
        },
    );
    return Brand;
};
