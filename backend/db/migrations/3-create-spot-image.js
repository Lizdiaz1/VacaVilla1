'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

// /* @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up(queryInterface, Sequelize) {
//     await queryInterface.createTable('SpotImages', {
//       id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER
//       },
//       spotId: {
//         allowNull: false, //  uncommented if every image must be linked to a spot
//         type: Sequelize.INTEGER,
//         references: { model: 'Spots', key: 'id' },
//         onUpdate: 'CASCADE', // Consider adding onUpdate and onDelete behavior if needed
//         onDelete: 'SET NULL' // or 'CASCADE' depending on want to handle deletion of a Spot
//       },
//       url: {
//         allowNull: false,
//         type: Sequelize.STRING(512)
//       },
//       preview: {
//         allowNull: false,
//         type: Sequelize.BOOLEAN
//       },
//       createdAt: {
//         defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
//         allowNull: false,
//         type: Sequelize.DATE
//       },
//       updatedAt: {
//         defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
//         allowNull: false,
//         type: Sequelize.DATE
//       }
//     });
//   },
//   async down(queryInterface, Sequelize) {
//     options.tableName = `SpotImages`;
//     await queryInterface.dropTable('SpotImages');
//   }
// };

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SpotImages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      spotId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Spots', key: 'id' }, // Ensure 'Spots' table exists
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      url: {
        allowNull: false,
        type: Sequelize.STRING(512)
      },
      preview: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Add the foreign key constraint separately after ensuring 'Spots' table exists
    await queryInterface.addConstraint('SpotImages', {
      type: 'foreign key',
      fields: ['spotId'],
      references: {
        table: 'Spots',
        field: 'id'
      },
      onDelete: 'SET NULL'
    });
  },
  async down(queryInterface, Sequelize) {
    // Drop the foreign key constraint before dropping the table
    await queryInterface.removeConstraint('SpotImages', 'spotId');
    await queryInterface.dropTable('SpotImages');
  }
};
