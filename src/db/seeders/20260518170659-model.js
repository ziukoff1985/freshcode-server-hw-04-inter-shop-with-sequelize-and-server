'use strict';

const { models } = require('../../constants/index');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('models', models, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('models', null, {});
    },
};
