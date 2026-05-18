'use strict';

const { brands } = require('../../constants/index');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('brands', brands, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('brands', null, {});
    },
};
