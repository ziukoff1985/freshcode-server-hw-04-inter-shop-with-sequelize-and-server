'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ItemType extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
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
