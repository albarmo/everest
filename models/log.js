"use strict";
const { Model } = require("sequelize");
const { v4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
    class Log extends Model {}
    Log.init(
        {
            service_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            request: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            response: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            destroyedAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        },
        {
            hooks: {
                beforeCreate(instance) {
                    instance.id = v4();
                },
            },
            sequelize,
            modelName: "Log",
            paranoid: true,
            deletedAt: "destroyedAt",
        }
    );
    return Log;
};
