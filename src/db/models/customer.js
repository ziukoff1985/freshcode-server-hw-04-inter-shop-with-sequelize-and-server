'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Customer extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Customer.hasMany(models.Order, {
                foreignKey: 'customerId',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
        }
    }
    Customer.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: 'customers_email_unique',
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Customer',
            tableName: 'customers',
            underscored: true,
        },
    );
    return Customer;
};
