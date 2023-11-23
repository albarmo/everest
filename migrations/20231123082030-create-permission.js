"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("Permissions", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
            },
            service_name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            service_description: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            restricted: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            destroyedAt: {
                type: Sequelize.DATE,
                allowNull: true,
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
        await queryInterface.dropTable("Permissions");
    },
};
