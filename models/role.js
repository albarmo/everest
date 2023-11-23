"use strict";
const { Model } = require("sequelize");
const { v4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
    class Role extends Model {
        static associate(models) {
            Role.hasMany(models.Role_Permision, {
                onDelete: "SET NULL",
                onUpdate: "CASCADE",
            });
        }
    }
    Role.init(
        {
            organization_id: {
                type: DataTypes.UUID,
                allowNull: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    msg: "Role name not unique",
                },
                validate: {
                    notEmpty: {
                        args: true,
                        msg: "Role name cannot be empty",
                    },
                    len: {
                        args: [1, 50],
                        msg: "Role name must between 1 - 50 character",
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
            modelName: "Role",
            paranoid: true,
            deletedAt: "destroyedAt",
        }
    );
    return Role;
};
