'use strict';

const bcrypt = require('bcrypt');

const { customers } = require('../../constants/index');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // Hash passwords
        const customersWithHashedPasswords = await Promise.all(
            customers.map(async (customer) => {
                const hashedPassword = await bcrypt.hash(customer.password, 10);
                return {
                    ...customer,
                    password: hashedPassword,
                };
            }),
        );

        await queryInterface.bulkInsert(
            'customers',
            customersWithHashedPasswords,
            {},
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('customers', null, {});
    },
};
