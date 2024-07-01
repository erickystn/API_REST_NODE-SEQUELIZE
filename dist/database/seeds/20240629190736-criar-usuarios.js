"use strict";const bcryptjs = require('bcryptjs');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('users', [{
      nome: 'Pedro Bandeira',
      email: 'pedrobandeira@email.com',
      password_hash: await bcryptjs.hash('123456789', 8),
      created_at: new Date(),
      updated_at: new Date(),

    },
    {
      nome: 'Maria Bandeira',
      email: 'mariabandeira@email.com',
      password_hash: await bcryptjs.hash('123456789', 8),
      created_at: new Date(),
      updated_at: new Date(),

    }], {});
  },

};
