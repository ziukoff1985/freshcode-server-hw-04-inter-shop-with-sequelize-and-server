'use strict';

const { orders } = require('../../constants/index');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('orders', orders, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('orders', null, {});
    },
};
