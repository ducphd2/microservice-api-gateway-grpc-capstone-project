'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.createTable('customers', {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      level: {
        type: Sequelize.ENUM('normal', 'silver', 'gold', 'platinum'),
        allowNull: false,
        defaultValue: 'normal',
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      branch_id: {
        type: Sequelize.INTEGER,
      },
      customer_code: {
        type: Sequelize.TEXT,
      },
      referrer: {
        type: Sequelize.TEXT,
      },
      referrer_code: {
        type: Sequelize.TEXT,
      },
      facebook: {
        type: Sequelize.TEXT,
      },
      zalo_phone: {
        type: Sequelize.TEXT,
      },
      height: {
        type: Sequelize.INTEGER,
      },
      weight: {
        type: Sequelize.INTEGER,
      },
      member_card_no: {
        type: Sequelize.TEXT,
      },
      company: {
        type: Sequelize.TEXT,
      },
      tax_no: {
        type: Sequelize.TEXT,
      },
      note: {
        type: Sequelize.TEXT,
      },
      related_user: {
        type: Sequelize.TEXT,
      },
      related_user_role: {
        type: Sequelize.TEXT,
      },
      related_user_phone: {
        type: Sequelize.TEXT,
      },
      created_at: {
        type: Sequelize.TEXT,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.TEXT,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.dropTable('customers');
  },
};
