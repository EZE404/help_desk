'use strict';

const id = `(SELECT id FROM clientes WHERE email = 'eze@correo.com')`;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('solicituds', [{
      tipo: 'compra',
      descripcion: 'DEMO SOLICITUD 1',
      uuid: 'DEMO1',
      ClienteId: Sequelize.literal(id)
    },{
      tipo: 'reclamo',
      descripcion: 'DEMO SOLICITUD 2',
      uuid: 'DEMO2',
      ClienteId: Sequelize.literal(id)   
    }, {
      tipo: 'servicio tecnico',
      descripcion: 'DEMO SOLICITUD 2',
      uuid: 'DEMO3',
      ClienteId: Sequelize.literal(id)
    }], {});
  
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('solicituds', {
      uuid: ['DEMO1', 'DEMO2', 'DEMO3']
    }, {});
  }
};
