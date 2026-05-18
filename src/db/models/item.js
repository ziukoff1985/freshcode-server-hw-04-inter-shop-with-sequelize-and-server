'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Item extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
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
                type: DataTypes.DECIMAL,
                allowNull: false,
            },
            storeId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'store_id',
            },
            amount: DataTypes.INTEGER,
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
