"use strict";

const { v4 } = require("uuid");
const { hashPassword } = require("../helpers/bcrypt");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasOne(models.Medical_Record, {
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
        }
    }
    User.init(
        {
            first_name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        args: true,
                        msg: "User Firstname cannot be empty",
                    },
                    len: {
                        args: [1, 20],
                        msg: "Firstname must between 1 - 20 character",
                    },
                },
            },
            last_name: {
                type: DataTypes.STRING,
                allowNull: true,
                validate: {
                    notEmpty: {
                        args: true,
                        msg: "User Lastname cannot be empty",
                    },
                    len: {
                        args: [1, 20],
                        msg: "Lastname must between 1 - 20 character",
                    },
                },
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    msg: "Username not unique",
                },
                validate: {
                    notEmpty: {
                        args: true,
                        msg: "User fullname cannot be empty",
                    },
                    len: {
                        args: [1, 20],
                        msg: "Firstname must between 1 - 20 character",
                    },
                },
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                isEmail: {
                    argv: true,
                    msg: "Email is already in use",
                },
                unique: {
                    argv: true,
                    msg: "Email is already in use",
                },
                validate: {
                    notEmpty: {
                        args: true,
                        msg: "Email cannot be empty",
                    },
                },
            },
            profile_picture: { type: DataTypes.STRING, allowNull: true },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        args: true,
                        msg: "Password cannot be empty",
                    },
                    len: {
                        args: [5, 30],
                        msg: "Minimum length of password is 5",
                    },
                },
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    argv: true,
                    msg: "Phone number is already in use",
                },
            },
            emergency_contact: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            birth_date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            academic_year: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            study_program: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            personal_number: {
                type: DataTypes.STRING,
                allowNull: true,
                unique: {
                    argv: true,
                    msg: "Personal number is already in use",
                },
            },
            destroyedAt: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {
            hooks: {
                beforeCreate(instance) {
                    instance.id = v4();
                    instance.password = hashPassword(instance.password);
                },
                beforeUpdate(instance) {
                    instance.password = hashPassword(instance.password);
                },
            },
            sequelize,
            modelName: "User",
            paranoid: true,
            deletedAt: "destroyedAt",
        }
    );
    return User;
};
