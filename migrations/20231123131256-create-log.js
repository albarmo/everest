"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("Logs", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
            },
            service_name: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            status: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            request: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            response: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            destroyedAt: {
                allowNull: true,
                type: Sequelize.DATE,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable("Logs");
    },
};
