'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Customer extends Model {
        static associate(models) {
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
                unique: {
                    name: 'customers_email_unique',
                    msg: 'Email already exists',
                },
                validate: {
                    isEmail: {
                        msg: 'Invalid email format',
                    },
                },
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
