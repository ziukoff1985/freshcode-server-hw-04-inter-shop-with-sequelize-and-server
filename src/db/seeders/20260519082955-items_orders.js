'use strict';

const { itemsOrders } = require('../../constants/index');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('items_orders', itemsOrders, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('items_orders', null, {});
    },
};
