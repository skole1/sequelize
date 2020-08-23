'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      return queryInterface.createTable("users", {
        id:{
          type:Sequelize.INTEGER,
          allowNull:false,
          autoIncrement:true,
          primaryKey:true
      },
      name:{
          type:Sequelize.STRING
      },
      email:{
          type:Sequelize.STRING
      },
      password:{
          type:Sequelize.STRING
      },
      createAt: Sequelize.DATE,
      updateAt: Sequelize.DATE
      });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("users");
  }
};
