'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('branch_service_groups', 'code');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('branch_service_groups', 'code', Sequelize.TEXT);
  },
};
