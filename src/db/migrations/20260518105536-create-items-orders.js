'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('items_orders', {
            item_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'items',
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            order_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'orders',
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('items_orders');
    },
};
