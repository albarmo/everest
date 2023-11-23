"use strict";

const { v4: uuidv4 } = require("uuid");
module.exports = {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert(
            "Roles",
            [
                {
                    id: uuidv4(),
                    name: "SUPERADMIN",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    destroyedAt: null,
                },
                {
                    id: uuidv4(),
                    name: "Administrator",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    destroyedAt: null,
                },
                {
                    id: uuidv4(),
                    name: "Member",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    destroyedAt: null,
                },
            ],
            {}
        );
    },

    down: async (queryInterface) => {
        await queryInterface.bulkDelete("Roles", null, {});
    },
};
