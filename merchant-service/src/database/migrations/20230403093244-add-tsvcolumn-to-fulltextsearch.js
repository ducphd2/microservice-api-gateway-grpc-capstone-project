'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('branch_services', 'tsv', 'tsvector');
    await queryInterface.addIndex('branch_services', ['tsv'], {
      name: 'ts_vector_index',
      type: 'FULLTEXT',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('branch_services', 'tsv');
    await queryInterface.removeIndex('branch_services', ['tsv'], {
      name: 'ts_vector_index',
      type: 'FULLTEXT',
    });
  },
};
