"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("Medical_Records", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
            },
            user_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: "Users",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "SET NULL",
            },
            height: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            weight: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            atshma: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            heart_disease: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            specific_disease: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            specific_disease_description: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            allergy: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            allergy_description: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            surgery_history: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            surgery_history_description: {
                type: Sequelize.STRING,
                allowNull: true,
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
        await queryInterface.dropTable("Medical_Records");
    },
};
