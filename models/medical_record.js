"use strict";
const { Model } = require("sequelize");
const { v4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
    class Medical_Record extends Model {
        static associate(models) {
            Medical_Record.belongsTo(models.User, {
                foreignKey: "user_id",
            });
        }
    }
    Medical_Record.init(
        {
            user_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            height: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    validate: {
                        min: 0,
                        max: 200,
                    },
                },
            },
            weight: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    validate: {
                        min: 0,
                        max: 200,
                    },
                },
            },
            atshma: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            heart_disease: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            specific_disease: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            specific_disease_description: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        args: true,
                        msg: "User Firstname cannot be empty",
                    },
                    len: {
                        args: [1, 200],
                        msg: "Firstname must between 1 - 200 character",
                    },
                },
            },
            allergy: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            allergy_description: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        args: true,
                        msg: "User Firstname cannot be empty",
                    },
                    len: {
                        args: [1, 200],
                        msg: "Firstname must between 1 - 200 character",
                    },
                },
            },
            surgery_history: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            surgery_history_description: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        args: true,
                        msg: "User Firstname cannot be empty",
                    },
                    len: {
                        args: [1, 200],
                        msg: "Firstname must between 1 - 200 character",
                    },
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
                },
            },
            sequelize,
            modelName: "Medical_Record",
            paranoid: true,
            deletedAt: "destroyedAt",
        }
    );
    return Medical_Record;
};
