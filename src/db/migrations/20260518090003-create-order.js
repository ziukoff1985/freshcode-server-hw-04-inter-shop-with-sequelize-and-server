'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.sequelize.query(
            'CREATE SEQUENCE order_code_seq START 10051 INCREMENT 1',
        );

        await queryInterface.createTable('orders', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            code: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: Sequelize.literal("nextval('order_code_seq')"),
            },
            date: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
            amount: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false,
            },
            paid: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            customer_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'customers',
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            created_at: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updated_at: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
        });
        await queryInterface.addConstraint('orders', {
            fields: ['code'],
            type: 'unique',
            name: 'orders_code_unique',
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('orders');
        await queryInterface.sequelize.query(
            'DROP SEQUENCE IF EXISTS order_code_seq',
        );
    },
};
