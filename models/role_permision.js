"use strict";
const { Model } = require("sequelize");
const { v4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
    class Role_Permision extends Model {
        static associate(models) {
            Role_Permision.belongsTo(models.Role, {
                foreignKey: "role_id",
            });
            Role_Permision.belongsTo(models.Permission, {
                foreignKey: "permision_id",
            });
        }
    }
    Role_Permision.init(
        {
            role_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            permision_id: {
                type: DataTypes.UUID,
                allowNull: false,
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
            modelName: "Role_Permision",
            paranoid: true,
            deletedAt: "destroyedAt",
        }
    );
    return Role_Permision;
};
