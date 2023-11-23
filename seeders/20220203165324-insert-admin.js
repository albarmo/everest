"use strict";

const { hashPassword } = require("../helpers/bcrypt");
const { v4: uuidv4 } = require("uuid");
module.exports = {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert(
            "Users",
            [
                {
                    id: uuidv4(),
                    first_name: "Admin",
                    last_name: "Tricora",
                    username: "TRICORA SUPER ADMIN",
                    email: "ticora@trilogi.ac.id",
                    profile_picture: "",
                    password: hashPassword("tcr-elbrus2023!"),
                    phone: "0",
                    emergency_contact: "0",
                    address: "Universitas Trilogi",
                    academic_year: "2016",
                    study_program: "TI",
                    personal_number: "Administrator",
                    birth_date: new Date(),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    destroyedAt: null,
                },
                {
                    id: uuidv4(),
                    first_name: "Rizky",
                    last_name: "Syahputra",
                    username: "eky",
                    email: "eky1579@gmail.com",
                    profile_picture: "",
                    password: hashPassword("tcr-elbrus2023!"),
                    phone: "12345678",
                    emergency_contact: "12345678",
                    address: "Jalan H mandor 12 A",
                    academic_year: "2016",
                    study_program: "TI",
                    personal_number: "TCR-147",
                    birth_date: new Date(),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    destroyedAt: null,
                },
                {
                    id: uuidv4(),
                    first_name: "Albar",
                    last_name: "Moerhamsa",
                    username: "Elang",
                    personal_number: "TCR-146",
                    email: "moerhamsa@gmail.com",
                    profile_picture: "",
                    password: hashPassword("tcr-elbrus2023!"),
                    phone: "081280709980",
                    emergency_contact: "0217667148",
                    address: "Jalan H mandor 12 A",
                    academic_year: "2016",
                    study_program: "TI",
                    birth_date: new Date(),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    destroyedAt: null,
                },
            ],
            {}
        );
    },

    down: async (queryInterface) => {
        await queryInterface.bulkDelete("Users", null, {});
    },
};
