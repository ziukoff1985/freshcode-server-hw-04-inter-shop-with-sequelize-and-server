'use strict';
const { Model: SequelizeModel } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Model extends SequelizeModel {
        static associate(models) {
            Model.hasMany(models.Item, {
                foreignKey: 'modelId',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
            Model.belongsTo(models.Brand, {
                foreignKey: 'brandId',
            });
        }
    }
    Model.init(
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: DataTypes.TEXT,
            brandId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'brand_id',
            },
        },
        {
            sequelize,
            modelName: 'Model',
            tableName: 'models',
            underscored: true,
        },
    );
    return Model;
};
