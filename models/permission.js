"use strict";
const { Model } = require("sequelize");
const { v4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
    class Permission extends Model {
        static associate(models) {
            Permission.hasMany(models.Role_Permision, {
                onDelete: "SET NULL",
                onUpdate: "CASCADE",
            });
        }
    }
    Permission.init(
        {
            service_name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        args: true,
                        msg: "Service name cannot be empty",
                    },
                    len: {
                        args: [1, 50],
                        msg: "Service name must between 1 - 50 character",
                    },
                },
            },
            service_description: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: {
                        args: [1, 100],
                        msg: "Service name must between 1 - 100 character",
                    },
                },
            },
            restricted: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
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
            modelName: "Permission",
            paranoid: true,
            deletedAt: "destroyedAt",
        }
    );
    return Permission;
};
