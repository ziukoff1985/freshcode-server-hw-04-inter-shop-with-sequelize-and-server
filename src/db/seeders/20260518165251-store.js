'use strict';

const { stores } = require('../../constants/index');

/** @type {import('sequelize-cli').Migration} */

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('stores', stores, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('stores', null, {});
    },
};
