'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('items', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            category_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'item_categories',
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            type_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'item_types',
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            brand_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'brands',
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            model_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'models',
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            price: {
                type: Sequelize.DECIMAL,
                allowNull: false,
            },
            store_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'stores',
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            amount: {
                type: Sequelize.INTEGER,
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('items');
    },
};
