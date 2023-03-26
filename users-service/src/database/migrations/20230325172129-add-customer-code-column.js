'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn('customers', 'customer_code', Sequelize.TEXT);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('customers', 'customer_code');
  },
};
