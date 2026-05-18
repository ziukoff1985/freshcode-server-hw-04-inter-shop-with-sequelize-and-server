'use strict';

const { itemTypes } = require('../../constants/index');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('item_types', itemTypes, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('item_types', null, {});
    },
};
