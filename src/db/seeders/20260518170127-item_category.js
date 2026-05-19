'use strict';

const { itemCategories } = require('../../constants/index');

/** @type {import('sequelize-cli').Migration} */

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('item_categories', itemCategories, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('item_categories', null, {});
    },
};
