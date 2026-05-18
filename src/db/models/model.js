'use strict';
const { Model: SequelizeModel } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Model extends SequelizeModel {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
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
